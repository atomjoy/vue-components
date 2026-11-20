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
	componentToString,
} from '@/components/ui/chart'
import ChartTooltipContent from '@/components/ui/chart/ChartTooltipContent.vue'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

// Odbieranie dynamicznych danych z Larabela
interface UtmTrend {
	date: string // Oczekuje formatu YYYY-MM-DD
	clicks: number
	registrations: number
	orders: number
}

const props = defineProps<{
	trendsData: UtmTrend[]
}>()

// Mapowanie stringów z datami na rzeczywiste obiekty Date dla Unovis
const formattedChartData = computed(() => {
	return (
		props.trendsData?.map((item) => ({
			...item,
			date: new Date(item.date),
		})) || []
	)
})

type Data = (typeof formattedChartData.value)[number]

// Konfiguracja trzech serii danych lejka konwersji UTM
const chartConfig = {
	clicks: {
		label: t('Clicks'),
		color: 'var(--color-chart-1, #94a3b8)',
	},
	registrations: {
		label: t('Registrations'),
		color: 'var(--color-chart-2, #10b981)',
	},
	orders: {
		label: t('Orders'),
		color: 'var(--color-chart-3, #3b82f6)',
	},
} satisfies ChartConfig

// Dynamiczne sumowanie wartości do stopki raportu
const totalClicks = computed(
	() => props.trendsData?.reduce((acc, curr) => acc + curr.clicks, 0) || 0,
)
const totalRegistrations = computed(
	() => props.trendsData?.reduce((acc, curr) => acc + curr.registrations, 0) || 0,
)
const totalOrders = computed(
	() => props.trendsData?.reduce((acc, curr) => acc + curr.orders, 0) || 0,
)
</script>

<template>
	<Card class="border shadow-none">
		<CardHeader>
			<CardTitle>{{ t('Conversion Trends') }}</CardTitle>
			<CardDescription>
				{{ t('Displaying marketing funnel statistics for the last 7 days') }}
			</CardDescription>
		</CardHeader>
		<CardContent>
			<div v-if="formattedChartData.length > 0" class="custom-y-axis-chart">
				<ChartContainer :config="chartConfig">
					<VisXYContainer
						:data="formattedChartData"
						:margin="{ left: 15, right: 15, top: 10, bottom: 10 }"
						:y-domain="[0, undefined]"
					>
						<!-- Kliknięcia w reklamy -->
						<VisLine
							:x="(d: Data) => d.date"
							:y="(d: Data) => d.clicks"
							:color="chartConfig.clicks.color"
							:curve-type="CurveType.Linear"
						/>

						<!-- Nowe rejestracje -->
						<VisLine
							:x="(d: Data) => d.date"
							:y="(d: Data) => d.registrations"
							:color="chartConfig.registrations.color"
							:curve-type="CurveType.Linear"
						/>

						<!-- Sfinalizowane zamówienia -->
						<VisLine
							:x="(d: Data) => d.date"
							:y="(d: Data) => d.orders"
							:color="chartConfig.orders.color"
							:curve-type="CurveType.Linear"
						/>

						<!-- OŚ X: Formatowanie daty na język polski (np. 12 paź) -->
						<VisAxis
							type="x"
							:x="(d: Data) => d.date"
							:tick-line="false"
							:domain-line="false"
							:grid-line="false"
							:num-ticks="7"
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

						<!-- OŚ Y: Siatka oraz formatowanie dużych wartości (np. 1.2k) -->
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
							:color="chartConfig.orders.color"
						/>
					</VisXYContainer>
				</ChartContainer>
			</div>

			<!-- Stan pusty -->
			<div v-else class="py-12 text-center text-sm text-gray-400">
				{{ t('No data available for the selected period') }}
			</div>
		</CardContent>

		<!-- Stopka z podsumowaniem i legendą trzech linii -->
		<CardFooter class="flex-col items-start gap-4 border-t pt-4 text-sm">
			<div class="grid w-full grid-cols-3 gap-4 text-center font-medium md:text-left">
				<div>
					<span class="text-muted-foreground block text-xs">{{ t('Total clicks') }}</span>
					<span class="text-lg font-bold text-slate-500">{{
						totalClicks.toLocaleString()
					}}</span>
				</div>
				<div>
					<span class="text-muted-foreground block text-xs">{{
						t('Total registrations')
					}}</span>
					<span class="text-lg font-bold text-emerald-600">{{
						totalRegistrations.toLocaleString()
					}}</span>
				</div>
				<div class="flex items-center justify-between">
					<div>
						<span class="text-muted-foreground block text-xs">{{
							t('Total orders')
						}}</span>
						<span class="text-lg font-bold text-blue-600">{{
							totalOrders.toLocaleString()
						}}</span>
					</div>
					<TrendingUp class="mb-1 hidden h-5 w-5 self-end text-blue-600 md:block" />
				</div>
			</div>

			<!-- Legenda kolorów -->
			<div
				class="text-muted-foreground flex w-full flex-wrap gap-x-6 gap-y-1 border-t pt-2 text-xs"
			>
				<span class="flex items-center gap-1.5">
					<span
						class="bg-chart-1 h-2 w-2 rounded-full"
						style="background-color: var(--color-chart-1, #94a3b8)"
					></span>
					{{ t('Clicks') }}
				</span>
				<span class="flex items-center gap-1.5">
					<span
						class="bg-chart-2 h-2 w-2 rounded-full"
						style="background-color: var(--color-chart-2, #10b981)"
					></span>
					{{ t('Registrations') }}
				</span>
				<span class="flex items-center gap-1.5">
					<span
						class="bg-chart-3 h-2 w-2 rounded-full"
						style="background-color: var(--color-chart-3, #3b82f6)"
					></span>
					{{ t('Orders') }}
				</span>
			</div>
		</CardFooter>
	</Card>
</template>
