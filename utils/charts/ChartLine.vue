<script setup lang="ts">
import type { ChartConfig } from '@/components/ui/chart'
import { TrendingUp } from '@lucide/vue'
import { CurveType } from '@unovis/ts'
import { VisAxis, VisLine, VisXYContainer } from '@unovis/vue'
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import {
	ChartContainer,
	ChartCrosshair,
	ChartTooltip,
	ChartTooltipContent,
	componentToString,
} from '@/components/ui/chart'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

// Data
const chartDataSample = [
	{ date: '2024-01-01', pageviews: 50, unique_users: 8 },
	{ date: '2024-01-03', pageviews: 150, unique_users: 45 },
	{ date: '2024-01-05', pageviews: 100, unique_users: 65 },
	{ date: '2024-01-09', pageviews: 89, unique_users: 49 },
]

// Odbieranie dynamicznych danych z Laravela
const props = defineProps<{
	chartData: Array<{
		date: string // Oczekuje formatu YYYY-MM-DD
		pageviews: number
		unique_users: number
	}>
}>()

// Mapowanie stringów z datami na rzeczywiste obiekty Date dla Unovis
const formattedChartData = computed(() => {
	return (
		props.chartData?.map((item) => ({
			...item,
			date: new Date(item.date),
		})) || []
	)
})

type Data = (typeof formattedChartData.value)[number]

// Konfiguracja Twoich dwóch serii danych (Odsłony i Unikalni)
const chartConfig = {
	pageviews: {
		label: t('Page views'),
		color: 'var(--color-chart-1, #0099ff)',
	},
	unique_users: {
		label: t('Unique Users (UU)'),
		color: 'var(--color-chart-2, #55cc55)',
	},
} satisfies ChartConfig

// Dynamiczne sumowanie do stopki (opcjonalnie do wykorzystania)
const totalPageviews = computed(
	() => props.chartData?.reduce((acc, curr) => acc + curr.pageviews, 0) || 0,
)
</script>

<template>
	<Card>
		<CardHeader>
			<CardTitle>{{ t('Stats') }}</CardTitle>
			<CardDescription>
				{{ t('Displaying statistics for a selected period') }}
			</CardDescription>
		</CardHeader>
		<CardContent>
			<!-- Dodana klasa 'custom-y-axis-chart' do wymuszenia stylów bocznych numerów -->
			<div v-if="formattedChartData.length > 0" class="custom-y-axis-chart">
				<ChartContainer :config="chartConfig">
					<VisXYContainer
						:data="formattedChartData"
						:margin="{ left: 0, right: 0, top: 10, bottom: 10 }"
						:y-domain="[0, undefined]"
					>
						<!-- Odsłony -->
						<VisLine
							:x="(d: Data) => d.date"
							:y="(d: Data) => d.pageviews"
							:color="chartConfig.pageviews.color"
							:curve-type="CurveType.Linear"
						/>

						<!-- Unikalni użytkownicy -->
						<VisLine
							:x="(d: Data) => d.date"
							:y="(d: Data) => d.unique_users"
							:color="chartConfig.unique_users.color"
							:curve-type="CurveType.Linear"
						/>

						<!-- OŚ X: Formatowanie na język polski (np. 1 kwi) -->
						<VisAxis
							type="x"
							:x="(d: Data) => d.date"
							:tick-line="false"
							:domain-line="false"
							:grid-line="false"
							:num-ticks="6"
							:tick-format="
								(d: number) => {
									const date = new Date(d)
									return date.toLocaleDateString('pl-PL', {
										month: 'short',
										day: 'numeric',
									})
								}
							"
							:tick-values="formattedChartData.map((d) => d.date)"
						/>

						<!-- OŚ Y: Włączone numery boczne oraz poziome linie pomocnicze (grid) -->
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
									hideLabel: false,
								})
							"
							:color="chartConfig.unique_users.color"
						/>
					</VisXYContainer>
				</ChartContainer>
			</div>

			<!-- Stan pusty -->
			<div v-else class="py-12 text-center text-sm text-gray-400">
				{{ t('No data') }}
			</div>
		</CardContent>

		<!-- Stopka ze statystykami i legendą -->
		<CardFooter class="flex-col items-start gap-2 text-sm">
			<div class="flex gap-2 leading-none font-medium">
				{{ t('Total views') }}: {{ totalPageviews.toLocaleString() }}
				<TrendingUp class="h-4 w-4" />
			</div>
			<div class="text-muted-foreground mt-2 flex gap-4 text-xs">
				<span class="flex items-center gap-1">
					<span class="bg-chart-1 h-2 w-2 rounded-full"></span>
					{{ t('Page views') }}
				</span>
				<span class="flex items-center gap-1">
					<span class="bg-chart-2 h-2 w-2 rounded-full"></span>
					{{ t('Unique Users (UU)') }}
				</span>
			</div>
		</CardFooter>
	</Card>
</template>
