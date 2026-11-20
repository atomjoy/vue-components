<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted } from 'vue'

// Data example
// import ChartSvgTooltipRwd, {ChartDataPoint} from '@/components/utils/charts/ChartSvgTooltipRwd.vue'
// <ChartSvgTooltipRwd
//     :data="mockData"
//     :smooth="true"
//     type="line"
//     lineColor="stroke-blue-500"
//     dotStrokeColor="stroke-blue-500"
//     dotFillColor="fill-lime-400"
//     dotFillHoverColor="fill-lime-300"
// />
// const mockData = ref<ChartDataPoint[]>([
// 	{ label: 'Styczeń', value: 35 },
// 	{ label: 'Luty', value: 55 },
// 	{ label: 'Marzec', value: 42 },
// 	{ label: 'Kwiecień', value: 85 },
// 	{ label: 'Maj', value: 67 },
// 	{ label: 'Czerwiec', value: 92 },
// ])

export interface ChartDataPoint {
	label: string
	value: number
}

interface Props {
	data: ChartDataPoint[]
	smooth: boolean
	type?: 'line' | 'bar'
	lineColor?: string
	barColor?: string
	dotStrokeColor?: string
	dotFillColor?: string
	dotStrokeHoverColor?: string
	dotFillHoverColor?: string
}

const props = withDefaults(defineProps<Props>(), {
	type: 'line',
	smooth: true,
	lineColor: 'stroke-blue-500',
	barColor: 'fill-lime-500/80 hover:fill-lime-400',
	// Ustawiamy domyślnie Twoje ulubione odcienie niebieskiego ⚡
	dotStrokeColor: 'stroke-blue-500',
	dotFillColor: 'fill-white dark:fill-slate-900',
	dotStrokeHoverColor: 'stroke-white dark:stroke-slate-900',
	dotFillHoverColor: 'fill-blue-600',
})

const containerRef = ref<HTMLDivElement | null>(null)

const svgWidth = ref(500)
const svgHeight = ref(281) // 16:9 proporcja startowa

const padding = { top: 30, right: 30, bottom: 40, left: 50 }
const hoveredIndex = ref<number | null>(null)

let resizeObserver: ResizeObserver | null = null

onMounted(() => {
	if (containerRef.value) {
		resizeObserver = new ResizeObserver((entries) => {
			for (let entry of entries) {
				const width = entry.contentRect.width
				if (width > 0) {
					svgWidth.value = width
					svgHeight.value = width * (9 / 16)
				}
			}
		})
		resizeObserver.observe(containerRef.value)
	}
})

onUnmounted(() => {
	if (resizeObserver) {
		resizeObserver.disconnect()
	}
})

const maxValue = computed(() => {
	const max = Math.max(...props.data.map((d) => d.value), 0)
	return max === 0 ? 100 : max * 1.1
})

const chartWidth = computed(() => svgWidth.value - padding.left - padding.right)
const chartHeight = computed(() => svgHeight.value - padding.top - padding.bottom)

const points = computed(() => {
	if (!props.data.length || chartWidth.value <= 0) return []

	const stepX =
		props.data.length > 1 ? chartWidth.value / (props.data.length - 1) : chartWidth.value

	return props.data.map((item, index) => {
		const x =
			padding.left +
			(props.type === 'bar'
				? index * (chartWidth.value / props.data.length) +
					chartWidth.value / props.data.length / 2
				: index * stepX)

		const y =
			padding.top + chartHeight.value - (item.value / maxValue.value) * chartHeight.value

		return { x, y, label: item.label, value: item.value }
	})
})

// const linePath = computed(() => {
// 	if (points.value.length < 2) return ''
// 	return points.value.reduce((path, pt, i) => {
// 		return i === 0 ? `M ${pt.x} ${pt.y}` : `${path} L ${pt.x} ${pt.y}`
// 	}, '')
// })

// Ścieżka (d) dla wykresu liniowego - obsługuje ostre linie oraz płynne krzywe Béziera
const linePath = computed(() => {
	const pts = points.value
	if (pts.length < 2) return ''

	if (!props.smooth) {
		// Klasyczna linia łamana (ostre kąty)
		return pts.reduce((path, pt, i) => {
			return i === 0 ? `M ${pt.x} ${pt.y}` : `${path} L ${pt.x} ${pt.y}`
		}, '')
	}

	// Płynna linia (Krzywe Béziera)
	let path = `M ${pts[0].x} ${pts[0].y}`

	for (let i = 0; i < pts.length - 1; i++) {
		const p0 = pts[i]
		const p1 = pts[i + 1]

		// Punkty kontrolne przesunięte o 1/3 odległości w osi X
		const cpX1 = p0.x + (p1.x - p0.x) / 3
		const cpY1 = p0.y

		const cpX2 = p0.x + (2 * (p1.x - p0.x)) / 3
		const cpY2 = p1.y

		path += ` C ${cpX1} ${cpY1}, ${cpX2} ${cpY2}, ${p1.x} ${p1.y}`
	}

	return path
})

const gridLines = computed(() => {
	const count = 4
	return Array.from({ length: count + 1 }, (_, i) => {
		const value = (maxValue.value / count) * i
		const y = padding.top + chartHeight.value - (value / maxValue.value) * chartHeight.value
		return { y, value: Math.round(value) }
	})
})

const barWidth = computed(() => {
	if (!props.data.length) return 0
	return (chartWidth.value / props.data.length) * 0.7
})
</script>

<template>
	<div
		ref="containerRef"
		class="w-full rounded-xl border border-slate-100 bg-white p-6 shadow-sm select-none dark:border-slate-800 dark:bg-slate-900"
	>
		<div class="relative aspect-video w-full">
			<svg
				v-if="points.length > 0"
				:viewBox="`0 0 ${svgWidth} ${svgHeight}`"
				class="h-full w-full overflow-visible"
			>
				<!-- Linie poziome siatki -->
				<g
					class="stroke-slate-100 dark:stroke-slate-800"
					stroke-width="1"
					stroke-dasharray="3,3"
				>
					<line
						v-for="(line, i) in gridLines"
						:key="i"
						:x1="padding.left"
						:y1="line.y"
						:x2="svgWidth - padding.right"
						:y2="line.y"
					/>
				</g>

				<!-- Etykiety osi Y -->
				<g
					class="fill-slate-400 font-sans dark:fill-slate-500"
					text-anchor="end"
					font-size="10"
				>
					<text
						v-for="(line, i) in gridLines"
						:key="i"
						:x="padding.left - 8"
						:y="line.y + 3"
					>
						{{ line.value }}
					</text>
				</g>

				<!-- RYSOWANIE: WYKRES SŁUPKOWY -->
				<g v-if="type === 'bar'">
					<rect
						v-for="(pt, i) in points"
						:key="i"
						:x="pt.x - barWidth / 2"
						:y="pt.y"
						:width="barWidth"
						:height="padding.top + chartHeight - pt.y"
						:class="[barColor, 'cursor-pointer transition-all duration-200']"
						rx="4"
						@mouseenter="hoveredIndex = i"
						@mouseleave="hoveredIndex = null"
					/>
				</g>

				<!-- RYSOWANIE: WYKRES LINIOWY -->
				<g v-if="type === 'line'">
					<path
						:d="linePath"
						fill="none"
						:class="[lineColor]"
						stroke-width="3"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>

					<!-- Triggery hoverów -->
					<circle
						v-for="(pt, i) in points"
						:key="'trigger-' + i"
						:cx="pt.x"
						:cy="pt.y"
						r="16"
						fill="transparent"
						class="cursor-pointer"
						@mouseenter="hoveredIndex = i"
						@mouseleave="hoveredIndex = null"
					/>

					<!-- Modyfikowalne kropki na wykresie -->
					<circle
						v-for="(pt, i) in points"
						:key="'dot-' + i"
						:cx="pt.x"
						:cy="pt.y"
						:r="hoveredIndex === i ? 6 : 4"
						:class="[
							hoveredIndex === i
								? [dotStrokeHoverColor, dotFillHoverColor, 'stroke-2']
								: [dotStrokeColor, dotFillColor, 'stroke-2'],
						]"
						class="pointer-events-none transition-all duration-150"
					/>
				</g>

				<!-- Etykiety osi X -->
				<g
					class="fill-slate-400 font-sans dark:fill-slate-500"
					text-anchor="middle"
					font-size="10"
				>
					<text
						v-for="(pt, i) in points"
						:key="i"
						:x="pt.x"
						:y="svgHeight - padding.bottom + 18"
					>
						{{ pt.label }}
					</text>
				</g>

				<!-- LATAJĄCY TOOLTIP -->
				<g
					v-if="hoveredIndex !== null && points[hoveredIndex]"
					:transform="`translate(${points[hoveredIndex].x}, ${points[hoveredIndex].y - 12})`"
					class="pointer-events-none transition-transform duration-75 ease-out"
				>
					<path
						d="M -30 -32 h 60 a 4 4 0 0 1 4 4 v 18 a 4 4 0 0 1 -4 4 h -26 l -4 5 l -4 -5 h -26 a 4 4 0 0 1 -4 -4 v -18 a 4 4 0 0 1 4 -4 z"
						class="fill-slate-900 opacity-95 drop-shadow-sm filter dark:fill-white"
					/>
					<text
						text-anchor="middle"
						font-size="10"
						font-weight="bold"
						class="fill-white font-sans dark:fill-slate-900"
						y="-14"
					>
						{{ points[hoveredIndex].value }}
					</text>
				</g>
			</svg>
		</div>
	</div>
</template>
