<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted } from 'vue'

// Data example
// import ChartSvgTooltipRwdSeries, {ChartSeries} from '@/components/utils/charts/ChartSvgTooltipRwdSeries.vue'
// <ChartSvgTooltipSeries :series="myMultiSeriesData" smooth />
// const myMultiSeriesData = ref<ChartSeries[]>([
// 	{
// 		name: 'Przychody (Neon Blue)',
// 		lineColor: 'stroke-blue-500',
// 		dotStrokeColor: 'stroke-blue-500',
// 		dotFillHoverColor: 'fill-blue-600',
// 		data: [
// 			{ label: 'Pon', value: 30 },
// 			{ label: 'Wt', value: 45 },
// 			{ label: 'Śr', value: 35 },
// 			{ label: 'Czw', value: 70 },
// 			{ label: 'Pt', value: 55 },
// 		],
// 	},
// 	{
// 		name: 'Koszty (Neon Lime)',
// 		lineColor: 'stroke-lime-500',
// 		dotStrokeColor: 'stroke-lime-500',
// 		dotFillHoverColor: 'fill-lime-600',
// 		data: [
// 			{ label: 'Pon', value: 15 },
// 			{ label: 'Wt', value: 20 },
// 			{ label: 'Śr', value: 25 },
// 			{ label: 'Czw', value: 30 },
// 			{ label: 'Pt', value: 22 },
// 		],
// 	},
// 	{
// 		name: 'Zysk netto (Cyber Fuchsia)',
// 		lineColor: 'stroke-fuchsia-500',
// 		dotStrokeColor: 'stroke-fuchsia-500',
// 		dotFillHoverColor: 'fill-fuchsia-600',
// 		data: [
// 			{ label: 'Pon', value: 15 },
// 			{ label: 'Wt', value: 25 },
// 			{ label: 'Śr', value: 10 },
// 			{ label: 'Czw', value: 40 },
// 			{ label: 'Pt', value: 33 },
// 		],
// 	},
// ])

// Definicja pojedynczego punktu w serii
export interface ChartDataPoint {
	label: string
	value: number
}

// Definicja całej serii danych
export interface ChartSeries {
	name: string
	data: ChartDataPoint[]
	lineColor: string // np. 'stroke-blue-500'
	dotStrokeColor: string // np. 'stroke-blue-500'
	dotFillHoverColor: string // np. 'fill-blue-600'
}

interface Props {
	series: ChartSeries[]
	smooth?: boolean
}

const props = withDefaults(defineProps<Props>(), {
	smooth: false,
})

const containerRef = ref<HTMLDivElement | null>(null)
const svgWidth = ref(500)
const svgHeight = ref(281)

const padding = { top: 30, right: 30, bottom: 40, left: 50 }

// Zapamiętujemy indeks najechanego punktu oraz z której serii pochodzi
const hoveredPoint = ref<{ seriesIndex: number; dataIndex: number } | null>(null)

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

// Szukamy globalnego maksimum ze wszystkich serii, żeby poprawnie wyskalować oś Y
const maxValue = computed(() => {
	const allValues = props.series.flatMap((s) => s.data.map((d) => d.value))
	const max = Math.max(...allValues, 0)
	return max === 0 ? 100 : max * 1.1
})

const chartWidth = computed(() => svgWidth.value - padding.left - padding.right)
const chartHeight = computed(() => svgHeight.value - padding.top - padding.bottom)

// Pobieramy etykiety osi X z pierwszej dostępnej serii
const xLabels = computed(() => {
	return props.series[0]?.data.map((d) => d.label) || []
})

// Przeliczamy wszystkie serie na współrzędne SVG (X, Y)
const computedSeries = computed(() => {
	if (!props.series.length || chartWidth.value <= 0) return []

	return props.series.map((s, seriesIndex) => {
		const dataLength = s.data.length
		const stepX = dataLength > 1 ? chartWidth.value / (dataLength - 1) : chartWidth.value

		const points = s.data.map((item, dataIndex) => {
			const x = padding.left + dataIndex * stepX
			const y =
				padding.top + chartHeight.value - (item.value / maxValue.value) * chartHeight.value
			return { x, y, label: item.label, value: item.value, dataIndex, seriesIndex }
		})

		// Generowanie ścieżki (ostrej lub gładkiej Béziera)
		let path = ''
		if (points.length >= 2) {
			if (!props.smooth) {
				path = points.reduce(
					(p, pt, i) => (i === 0 ? `M ${pt.x} ${pt.y}` : `${p} L ${pt.x} ${pt.y}`),
					'',
				)
			} else {
				path = `M ${points[0].x} ${points[0].y}`
				for (let i = 0; i < points.length - 1; i++) {
					const p0 = points[i]
					const p1 = points[i + 1]
					const cpX1 = p0.x + (p1.x - p0.x) / 3
					const cpX2 = p0.x + (2 * (p1.x - p0.x)) / 3
					path += ` C ${cpX1} ${p0.y}, ${cpX2} ${p1.y}, ${p1.x} ${p1.y}`
				}
			}
		}

		return {
			...s,
			points,
			path,
			seriesIndex,
		}
	})
})

// Wyciągamy aktywny punkt do tooltipu
const activePoint = computed(() => {
	if (!hoveredPoint.value) return null
	const { seriesIndex, dataIndex } = hoveredPoint.value
	const series = computedSeries.value[seriesIndex]
	return {
		point: series?.points[dataIndex],
		seriesName: series?.name,
	}
})

// Linie pomocnicze siatki (Y)
const gridLines = computed(() => {
	const count = 4
	return Array.from({ length: count + 1 }, (_, i) => {
		const value = (maxValue.value / count) * i
		const y = padding.top + chartHeight.value - (value / maxValue.value) * chartHeight.value
		return { y, value: Math.round(value) }
	})
})
</script>

<template>
	<div
		ref="containerRef"
		class="w-full rounded-xl border border-slate-100 bg-white p-6 shadow-sm select-none dark:border-slate-800 dark:bg-slate-900"
	>
		<!-- Mini Legenda na górze wykresu -->
		<div class="mb-4 flex flex-wrap gap-4 text-xs font-medium">
			<div v-for="(s, i) in series" :key="i" class="flex items-center gap-1.5">
				<span
					class="h-0.5 w-3 rounded"
					:class="s.lineColor.replace('stroke-', 'bg-')"
				></span>
				<span class="text-slate-600 dark:text-slate-400">{{ s.name }}</span>
			</div>
		</div>

		<div class="relative aspect-video w-full">
			<svg
				v-if="computedSeries.length > 0"
				:viewBox="`0 0 ${svgWidth} ${svgHeight}`"
				class="h-full w-full overflow-visible"
			>
				<!-- Linie siatki -->
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

				<!-- Oś Y -->
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

				<!-- RYSOWANIE SERII (Każda linia i jej kropki) -->
				<g v-for="s in computedSeries" :key="s.seriesIndex">
					<!-- Ścieżka wykresu -->
					<path
						:d="s.path"
						fill="none"
						:class="[s.lineColor]"
						stroke-width="3"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>

					<!-- Niewidzialne powiększone triggery hovera dla każdej kropki -->
					<circle
						v-for="pt in s.points"
						:key="'trigger-' + pt.dataIndex"
						:cx="pt.x"
						:cy="pt.y"
						r="14"
						fill="transparent"
						class="cursor-pointer"
						@mouseenter="
							hoveredPoint = { seriesIndex: s.seriesIndex, dataIndex: pt.dataIndex }
						"
						@mouseleave="hoveredPoint = null"
					/>

					<!-- Widoczne kropki -->
					<circle
						v-for="pt in s.points"
						:key="'dot-' + pt.dataIndex"
						:cx="pt.x"
						:cy="pt.y"
						:r="
							hoveredPoint?.seriesIndex === s.seriesIndex &&
							hoveredPoint?.dataIndex === pt.dataIndex
								? 6
								: 4
						"
						:class="[
							hoveredPoint?.seriesIndex === s.seriesIndex &&
							hoveredPoint?.dataIndex === pt.dataIndex
								? [
										'stroke-white dark:stroke-slate-900',
										s.dotFillHoverColor,
										'stroke-2',
									]
								: [s.dotStrokeColor, 'fill-white dark:fill-slate-900', 'stroke-2'],
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
						v-for="(label, i) in xLabels"
						:key="i"
						:x="padding.left + i * (chartWidth / (xLabels.length - 1))"
						:y="svgHeight - padding.bottom + 18"
					>
						{{ label }}
					</text>
				</g>

				<!-- LATAJĄCY TOOLTIP -->
				<g
					v-if="activePoint"
					:transform="`translate(${activePoint.point.x}, ${activePoint.point.y - 12})`"
					class="pointer-events-none transition-transform duration-75 ease-out"
				>
					<path
						d="M -45 -36 h 90 a 4 4 0 0 1 4 4 v 22 a 4 4 0 0 1 -4 4 h -39 l -2.5 4 l -2.5 -4 h -46 a 4 4 0 0 1 -4 -4 v -22 a 4 4 0 0 1 4 -4 z"
						class="fill-slate-900 opacity-95 drop-shadow-sm filter dark:fill-white"
					/>
					<text
						text-anchor="middle"
						font-size="9"
						class="fill-slate-400 font-sans dark:fill-slate-500"
						y="-22"
					>
						{{ activePoint.seriesName }}
					</text>
					<text
						text-anchor="middle"
						font-size="11"
						font-weight="bold"
						class="fill-white font-sans dark:fill-slate-900"
						y="-10"
					>
						{{ activePoint.point.value }}
					</text>
				</g>
			</svg>
		</div>
	</div>
</template>
