<script setup lang="ts">
import { computed, ref } from 'vue'

// Data example
// import ChartSvgTooltip, {ChartDataPoint} from '@/components/utils/charts/ChartSvgTooltip.vue'
// <ChartSvgTooltip
// 	:data="mockData"
// 	type="line"
// 	:height="250"
// 	lineColor="stroke-blue-500"
// 	barColor="fill-lime-500/80 hover:fill-lime-500"
// />
// const mockData = ref<ChartDataPoint[]>([
// 	{ label: 'Styczeń', value: 35 },
// 	{ label: 'Luty', value: 55 },
// 	{ label: 'Marzec', value: 42 },
// 	{ label: 'Kwiecień', value: 85 },
// 	{ label: 'Maj', value: 67 },
// 	{ label: 'Czerwiec', value: 92 },
// ])

// Definicja pojedynczego punktu danych
export interface ChartDataPoint {
	label: string
	value: number
}

// Props komponentu
interface Props {
	data: ChartDataPoint[]
	type?: 'line' | 'bar'
	height?: number
	lineColor?: string
	barColor?: string
	circleStroke?: string
	circleFill?: string
	tooltipLabel?: string
}

const props = withDefaults(defineProps<Props>(), {
	type: 'line',
	height: 300,
	lineColor: 'stroke-blue-500',
	barColor: 'fill-lime-500/80 hover:fill-lime-500',
	circleStroke: 'stroke-blue-600',
	circleFill: 'fill-blue-600',
	tooltipLabel: 'Wartość',
})

// Wymiary wewnętrzne SVG i marginesy na osie/napisy
const svgWidth = 500
const svgHeight = 250
const padding = { top: 20, right: 20, bottom: 30, left: 40 }

// Stan dla tooltipu
const hoveredIndex = ref<number | null>(null)

// Obliczenia wartości min/max do skalowania osi Y
const maxValue = computed(() => {
	const max = Math.max(...props.data.map((d) => d.value), 0)
	return max === 0 ? 100 : max * 1.1 // Dodajemy 10% zapasu u góry
})

// Szerokość i wysokość obszaru rysowania
const chartWidth = computed(() => svgWidth - padding.left - padding.right)
const chartHeight = computed(() => svgHeight - padding.top - padding.bottom)

// Mapowanie danych na współrzędne (X, Y) wewnątrz SVG
const points = computed(() => {
	if (!props.data.length) return []

	const stepX =
		props.data.length > 1 ? chartWidth.value / (props.data.length - 1) : chartWidth.value

	return props.data.map((item, index) => {
		// W przypadku wykresu słupkowego chcemy wyśrodkować punkty w sekcjach
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

// Ścieżka (d) dla wykresu liniowego
const linePath = computed(() => {
	if (points.value.length < 2) return ''
	return points.value.reduce((path, pt, i) => {
		return i === 0 ? `M ${pt.x} ${pt.y}` : `${path} L ${pt.x} ${pt.y}`
	}, '')
})

// Linie pomocnicze siatki poziomej (Y)
const gridLines = computed(() => {
	const count = 4
	return Array.from({ length: count + 1 }, (_, i) => {
		const value = (maxValue.value / count) * i
		const y = padding.top + chartHeight.value - (value / maxValue.value) * chartHeight.value
		return { y, value: Math.round(value) }
	})
})

// Szerokość pojedynczego słupka
const barWidth = computed(() => {
	if (!props.data.length) return 0
	return (chartWidth.value / props.data.length) * 0.75 // 0.75 dla zachowania odstępów między słupkami
})
</script>

<template>
	<div
		class="w-full rounded-xl border border-slate-100 bg-white p-6 shadow-sm select-none dark:border-slate-800 dark:bg-slate-900"
	>
		<!-- Kontener SVG responsywny -->
		<div :style="{ height: `${height}px` }" class="relative w-full">
			<svg :viewBox="`0 0 ${svgWidth} ${svgHeight}`" class="h-full w-full overflow-visible">
				<!-- Linie poziome siatki (Grid) -->
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

				<!-- Słupkowy -->
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

				<!-- Liniowy -->
				<g v-if="type === 'line'">
					<path
						:d="linePath"
						fill="none"
						:class="[lineColor]"
						stroke-width="3"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>

					<!-- Ukryte, większe obszary dotykowe/hover -->
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

					<!-- Widoczne kropki -->
					<circle
						v-for="(pt, i) in points"
						:key="'dot-' + i"
						:cx="pt.x"
						:cy="pt.y"
						:r="hoveredIndex === i ? 6 : 4"
						:class="[
							hoveredIndex === i
								? circleFill + ' stroke-white stroke-2 dark:stroke-slate-900'
								: circleStroke + ' fill-white stroke-2 dark:fill-slate-900',
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
						:y="svgHeight - padding.bottom + 16"
					>
						{{ pt.label }}
					</text>
				</g>

				<!-- Renderowany wewnątrz SVG -->
				<g
					v-if="hoveredIndex !== null && points[hoveredIndex]"
					:transform="`translate(${points[hoveredIndex].x}, ${points[hoveredIndex].y - 12})`"
					class="pointer-events-none transition-transform duration-100 ease-out"
				>
					<!-- Tło tooltipu (Dymek ze strzałką w dół) -->
					<path
						d="M -35 -32 h 70 a 4 4 0 0 1 4 4 v 18 a 4 4 0 0 1 -4 4 h -30 l -4 5 l -4 -5 h -32 a 4 4 0 0 1 -4 -4 v -18 a 4 4 0 0 1 4 -4 z"
						class="fill-blue-500 opacity-95 drop-shadow-md filter dark:fill-white"
					/>

					<!-- Tekst wewnątrz tooltipu -->
					<text
						text-anchor="middle"
						font-size="9"
						font-weight="bold"
						class="fill-white font-sans dark:fill-slate-900"
						y="-14"
					>
						{{ tooltipLabel }}: {{ points[hoveredIndex].value }}
					</text>
				</g>
			</svg>
		</div>
	</div>
</template>
