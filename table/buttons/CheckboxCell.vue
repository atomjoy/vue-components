<script setup lang="ts" generic="T extends Record<string, any>">
import { computed, type Ref } from 'vue'

interface TableOptions {
	isAllSelected: Ref<boolean>
	selectedIds: Ref<number[]>
	rows: Ref<T[]>
}

const props = defineProps<{
	id?: number | string
	row?: T
	options: TableOptions
	toggleAll: (isAllSelected: Ref<boolean>, selectedIds: Ref<number[]>, rows: Ref<T[]>) => void
	toggleRow: (id: number, selectedIds: Ref<number[]>) => void
}>()

const isChecked = computed(() => {
	if (props.id === undefined) {
		return props.options.isAllSelected.value
	}
	const numericId = typeof props.id === 'string' ? parseInt(props.id, 10) : props.id
	return props.options.selectedIds.value.includes(numericId)
})

const handleChange = (): void => {
	if (props.id === undefined) {
		props.toggleAll(props.options.isAllSelected, props.options.selectedIds, props.options.rows)
	} else {
		const numericId = typeof props.id === 'string' ? parseInt(props.id, 10) : props.id
		if (!isNaN(numericId)) {
			props.toggleRow(numericId, props.options.selectedIds)
		}
	}
}
</script>

<template>
	<input
		type="checkbox"
		:checked="isChecked"
		@change="handleChange"
		class="h-4 w-4 rounded border-gray-300 text-gray-600 focus:ring-gray-500"
	/>
</template>
