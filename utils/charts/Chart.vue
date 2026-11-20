<script setup lang="ts">
import type { ChartConfig } from '@/components/ui/chart'
import { VisAxis, VisLine, VisXYContainer } from '@unovis/vue'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
	ChartContainer,
	ChartCrosshair,
	ChartTooltip,
	ChartTooltipContent,
	componentToString,
} from '@/components/ui/chart'
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

// Data
const chartDataSample = [
	{ date: '2024-01-01', pageviews: 50, unique_users: 8 },
	{ date: '2024-01-03', pageviews: 150, unique_users: 45 },
	{ date: '2024-01-05', pageviews: 100, unique_users: 65 },
	{ date: '2024-01-09', pageviews: 89, unique_users: 49 },
]

const props = defineProps<{
	chartData: Array<{
		date: string // Formatu YYYY-MM-DD ze stringa
		pageviews: number
		unique_users: number
	}>
}>()

// Przetwarzanie dat ze stringów na obiekty Date
const formattedChartData = computed(() => {
	return (
		props.chartData?.map((item) => ({
			...item,
			date: new Date(item.date),
		})) || []
	)
})

type Data = (typeof formattedChartData.value)[number]

// Konfiguracja Twoich kluczy i kolorów shadcn
const chartConfig = {
	views: {
		label: 'Statystyki',
		color: undefined,
	},
	pageviews: {
		label: t('Page views'),
		color: 'var(--color-chart-1, #0099ff)',
	},
	unique_users: {
		label: t('Unique Users (UU)'),
		color: 'var(--color-chart-2, #55cc55)',
	},
} satisfies ChartConfig

// Aktywna domyślna linia
const activeChart = ref<'pageviews' | 'unique_users'>('pageviews')

// Sumowanie dynamiczne na bazie props.chartData
const total = computed(() => ({
	pageviews: props.chartData?.reduce((acc, curr) => acc + curr.pageviews, 0) || 0,
	unique_users: props.chartData?.reduce((acc, curr) => acc + curr.unique_users, 0) || 0,
}))
</script>

<template>
	<Card class="py-4 sm:py-0">
		<CardHeader class="flex flex-col items-stretch border-b p-0 pb-0! sm:flex-row">
			<div class="flex flex-1 flex-col justify-center gap-1 px-6 pb-3 sm:pb-0">
				<CardTitle>{{ t('Stats') }}</CardTitle>
				<CardDescription>
					{{ t('Displaying statistics for a selected period') }}
				</CardDescription>
			</div>
			<div class="flex">
				<button
					v-for="chart in ['pageviews', 'unique_users'] as const"
					:key="chart"
					:data-active="activeChart === chart"
					class="data-[active=true]:bg-muted/50 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l sm:border-t-0 sm:border-l sm:px-8 sm:py-6"
					@click="activeChart = chart"
				>
					<span class="text-muted-foreground text-xs">
						{{ chartConfig[chart].label }}
					</span>
					<span class="text-lg leading-none font-bold sm:text-3xl">
						{{ total[chart].toLocaleString() }}
					</span>
				</button>
			</div>
		</CardHeader>

		<CardContent class="px-2 sm:p-6">
			<!-- Wykres renderuje się tylko, gdy dane fizycznie istnieją -->
			<div v-if="formattedChartData.length > 0" class="custom-y-axis-chart">
				<ChartContainer :config="chartConfig" class="aspect-auto h-62.5 w-full" cursor>
					<VisXYContainer
						:data="formattedChartData"
						:margin="{ left: 0, right: 0, top: 10, bottom: 10 }"
						:y-domain="[0, undefined]"
					>
						<!-- Dynamiczna linia rysowana na podstawie aktywnego przycisku -->
						<VisLine
							:x="(d: Data) => d.date"
							:y="(d: Data) => d[activeChart]"
							:color="chartConfig[activeChart].color"
						/>

						<!-- Oś X z polskim formatowaniem daty (np. 1 kwi) -->
						<VisAxis
							type="x"
							:x="(d: Data) => d.date"
							:tick-line="false"
							:domain-line="false"
							:grid-line="false"
							:tick-format="
								(d: number) => {
									const date = new Date(d)
									return date.toLocaleDateString('pl-PL', {
										month: 'short',
										day: 'numeric',
									})
								}
							"
						/>

						<!-- <VisAxis type="y" :num-ticks="3" :tick-line="false" :domain-line="false" /> -->

						<VisAxis
							type="y"
							:num-ticks="4"
							:tick-line="false"
							:domain-line="false"
							:grid-line="true"
							:tick-format="
								(d: number) =>
									d >= 1000 ? `${(d / 1000).toFixed(1)}k` : d.toString()
							"
						/>

						<ChartTooltip />

						<ChartCrosshair
							:template="
								componentToString(chartConfig, ChartTooltipContent, {
									labelFormatter(d) {
										return new Date(d).toLocaleDateString('pl-PL', {
											month: 'long',
											day: 'numeric',
											year: 'numeric',
										})
									},
								})
							"
							:color="chartConfig[activeChart].color"
						/>
					</VisXYContainer>
				</ChartContainer>
			</div>

			<div v-else class="py-12 text-center text-sm text-gray-400">
				{{ t('No data') }}
			</div>
		</CardContent>
	</Card>
</template>
