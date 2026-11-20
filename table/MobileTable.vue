<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const props = defineProps<{
	payload: any[]
	columns: any[]
}>()

// Twoway binding
const selectedIds = defineModel<number[]>({ default: () => [] })
const sortBy = defineModel<string>('sortBy', { default: 'id' })
const sortDir = defineModel<string>('sortDir', { default: 'desc' })

const sortableColumns = computed(() => {
	return props.columns.filter((c) => c.sortable)
})

const toggleSortDirection = () => {
	sortDir.value = sortDir.value === 'asc' ? 'desc' : 'asc'
}
</script>

<template>
	<div class="flex flex-col space-y-4 md:hidden">
		<div
			v-if="sortableColumns.length > 0"
			class="bg-muted/40 flex items-center justify-between gap-2 rounded-xl border p-3 text-xs"
		>
			<div class="flex flex-1 items-center gap-2">
				<label
					for="mobile-sort-by"
					class="text-muted-foreground font-medium whitespace-nowrap"
				>
					{{ t('Sortuj po') }}:
				</label>
				<select
					id="mobile-sort-by"
					v-model="sortBy"
					class="bg-background border-input focus:ring-ring flex h-8 w-full rounded-md border px-2 py-1 text-xs font-medium focus:ring-1 focus:outline-none"
				>
					<option v-for="column in sortableColumns" :key="column.key" :value="column.key">
						{{ column.label ? t(column.label) : column.key }}
					</option>
				</select>
			</div>

			<button
				@click="toggleSortDirection"
				type="button"
				class="border-input hover:bg-accent hover:text-accent-foreground flex h-8 w-8 items-center justify-center rounded-md border bg-transparent transition-colors"
				:title="sortDir === 'asc' ? t('Sortuj malejąco') : t('Sortuj rosnąco')"
			>
				<span
					:class="[
						'inline-block text-sm font-bold transition-transform duration-200',
						sortDir === 'desc' ? 'rotate-180' : '',
					]"
				>
					↑
				</span>
			</button>
		</div>

		<div
			v-for="row in payload"
			:key="row.id"
			:class="{ 'border-blue-300': selectedIds.includes(row.id) }"
			class="bg-card text-card-foreground hover:bg-muted/50 mb-4 space-y-4 rounded-xl border p-4 transition-colors"
		>
			<div class="flex w-full items-center justify-between border-b pb-2 text-xs">
				<div class="flex items-center gap-2 font-medium">
					<template v-for="column in columns" :key="column.key">
						<span
							v-if="(column.key === 'id' || column.key === 'select') && column.render"
						>
							<component :is="column.render(row.id, row)" />
						</span>
					</template>
					<!-- <span class="text-muted-foreground font-mono">#{{ row.id }}</span> -->
				</div>
				<div class="ml-auto">
					<template v-for="column in columns" :key="column.key">
						<span v-if="column.key === 'actions' && column.render">
							<component :is="column.render(null, row)" />
						</span>
					</template>
				</div>
			</div>
			<div class="flex flex-col gap-y-4 text-xs">
				<template v-for="column in columns" :key="column.key">
					<div
						v-if="
							column.key !== 'id' &&
							column.key !== 'select' &&
							column.key !== 'actions'
						"
						class="flex flex-col"
					>
						<span class="text-muted-foreground mb-1 block">
							{{ column.label ? t(column.label) : '' }}
						</span>
						<div class="text-foreground font-medium">
							<template v-if="column.render">
								<component :is="column.render(row[column.key], row)" />
							</template>
							<template v-else>
								{{ row[column.key] }}
							</template>
						</div>
					</div>
				</template>
			</div>
		</div>

		<div
			v-if="payload.length == 0"
			class="flex flex-col items-center justify-center rounded-lg border border-dashed border-gray-300 bg-white p-8 text-center dark:border-gray-700 dark:bg-gray-800"
		>
			<p class="text-sm font-medium text-gray-500 dark:text-gray-400">
				{{ t('Brak danych.') }}
			</p>
			<p class="mt-1 text-xs text-gray-400 dark:text-gray-500">
				{{ t('W tej chwili nie ma żadnych rekordów do wyświetlenia.') }}
			</p>
		</div>
	</div>
</template>
