<script setup lang="ts">
import { ref } from 'vue'
import ChartSvg, { ChartDataPoint } from './ChartSvg.vue'
import ChartSvgTooltip from './ChartSvgTooltip.vue'
import ChartSvgTooltipRwd from './ChartSvgTooltipRwd.vue'
import ChartSvgTooltipRwdSeries, { ChartSeries } from './ChartSvgTooltipRwdSeries.vue'

const mockData = ref<ChartDataPoint[]>([
	{ label: 'Styczeń', value: 35 },
	{ label: 'Luty', value: 55 },
	{ label: 'Marzec', value: 42 },
	{ label: 'Kwiecień', value: 85 },
	{ label: 'Maj', value: 67 },
	{ label: 'Czerwiec', value: 92 },
])

const myMultiSeriesData = ref<ChartSeries[]>([
	{
		name: 'Przychody',
		lineColor: 'stroke-blue-500',
		dotStrokeColor: 'stroke-blue-500',
		dotFillHoverColor: 'fill-blue-600',
		data: [
			{ label: 'Pon', value: 30 },
			{ label: 'Wt', value: 45 },
			{ label: 'Śr', value: 35 },
			{ label: 'Czw', value: 70 },
			{ label: 'Pt', value: 55 },
		],
	},
	{
		name: 'Koszty',
		lineColor: 'stroke-lime-500',
		dotStrokeColor: 'stroke-lime-500',
		dotFillHoverColor: 'fill-lime-600',
		data: [
			{ label: 'Pon', value: 15 },
			{ label: 'Wt', value: 20 },
			{ label: 'Śr', value: 25 },
			{ label: 'Czw', value: 30 },
			{ label: 'Pt', value: 22 },
		],
	},
	{
		name: 'Zysk netto',
		lineColor: 'stroke-fuchsia-500',
		dotStrokeColor: 'stroke-fuchsia-500',
		dotFillHoverColor: 'fill-fuchsia-600',
		data: [
			{ label: 'Pon', value: 15 },
			{ label: 'Wt', value: 25 },
			{ label: 'Śr', value: 10 },
			{ label: 'Czw', value: 40 },
			{ label: 'Pt', value: 33 },
		],
	},
])
</script>

<template>
	<section>
		<ChartSvg
			:data="mockData"
			type="bar"
			:height="250"
			barColor="fill-lime-500/80 hover:fill-lime-500"
		/>

		<ChartSvgTooltip
			:data="mockData"
			type="line"
			:height="250"
			lineColor="stroke-blue-500"
			barColor="fill-lime-500/80 hover:fill-lime-500"
		/>

		<ChartSvgTooltipRwd
			:data="mockData"
			:smooth="true"
			type="line"
			lineColor="stroke-blue-500"
			dotStrokeColor="stroke-blue-500"
			dotFillColor="fill-lime-400"
			dotFillHoverColor="fill-lime-300"
		/>

		<ChartSvgTooltipRwdSeries :series="myMultiSeriesData" smooth />
	</section>
</template>
