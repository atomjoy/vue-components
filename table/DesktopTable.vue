<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import SortButton from '@/components/table/buttons/SortButton.vue'
import { User } from '@/types/pages'

const { t } = useI18n()

const props = defineProps<{
	payload: any[]
	columns: any[]
}>()

// Dwukierunkowe modele (two-way bindings) automatycznie emitujące zmiany w górę
const selectedIds = defineModel<number[]>({ default: () => [] })
const sortBy = defineModel<string>('sortBy', { default: 'id' })
const sortDir = defineModel<string>('sortDir', { default: 'desc' })

const triggerSort = (columnKey: string) => {
	if (sortBy.value === columnKey) {
		sortDir.value = sortDir.value === 'asc' ? 'desc' : 'asc'
	} else {
		sortBy.value = columnKey
		sortDir.value = 'desc'
	}
}
</script>

<template>
	<div class="relative hidden w-full overflow-auto md:block">
		<table class="w-full caption-bottom text-sm">
			<thead class="bg-muted/40 text-muted-foreground border-b font-medium">
				<tr class="transition-colors">
					<th
						v-for="column in columns"
						:key="column.key"
						@click="column.sortable ? triggerSort(column.key) : null"
						:class="[
							column.sortable ? 'hover:bg-muted/80 cursor-pointer select-none' : '',
							column.key === 'id' ? 'w-12 px-4' : 'px-4',
							'h-12 text-left align-middle font-medium transition-colors',
						]"
					>
						<div class="flex items-center gap-1">
							<!-- Nagłówek dla ID renderuje checkbox "zaznacz wszystko" z pliku columns.ts -->
							<template v-if="column.key === 'id' && column.render">
								<component :is="column.render(undefined, {} as User)" />
							</template>
							<template v-else>
								{{ t(column.label) ?? '' }}
							</template>

							<SortButton
								v-if="column.sortable"
								:column-field="column.key"
								:current-sort-by="sortBy"
								:current-sort-dir="sortDir"
							/>
						</div>
					</th>
				</tr>
			</thead>

			<tbody class="divide-y">
				<tr
					v-for="row in payload"
					:key="row.id"
					class="hover:bg-muted/50 transition-colors"
					:class="{ 'bg-muted/30': selectedIds.includes(row.id) }"
				>
					<!-- Dynamiczne komórki wiersza -->
					<td
						v-for="column in columns"
						:key="column.key"
						class="p-4 align-middle"
						:class="{ 'text-right': column.key === 'actions' }"
					>
						<!-- Wywołanie render() dla dedykowanych komponentów (checkboxy, statusy, dropdowny) -->
						<template v-if="column.render">
							<component :is="column.render(row[column.key], row)" />
						</template>
						<template v-else>
							{{ row[column.key] }}
						</template>
					</td>
				</tr>
				<tr v-if="payload.length == 0">
					<td
						colspan="10"
						class="bg-white px-6 py-4 text-center text-sm text-gray-500 dark:bg-gray-800"
					>
						{{ t('Brak danych.') }}
					</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>
