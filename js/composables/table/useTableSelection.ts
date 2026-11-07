import { ref, computed, type Ref, type ComputedRef } from 'vue'
import { router } from '@inertiajs/vue3'
import { useI18n } from 'vue-i18n'

interface Identifiable {
	id: number
}

export function useTableSelection<T extends Identifiable>(
	baseRoute: Ref<string> | string,
	currentData: Ref<T[]> | ComputedRef<T[]>,
) {
	const { t } = useI18n()
	const selectedIds = ref<number[]>([])
	const routeUrl = computed(() => (typeof baseRoute === 'string' ? baseRoute : baseRoute.value))

	const isAllSelected = computed(() => {
		if (currentData.value.length === 0) return false
		return currentData.value.every((item) => selectedIds.value.includes(item.id))
	})

	const toggleSelectAll = () => {
		if (isAllSelected.value) {
			selectedIds.value = selectedIds.value.filter(
				(id) => !currentData.value.some((item) => item.id === id),
			)
		} else {
			const currentIds = currentData.value.map((item) => item.id)
			selectedIds.value = [...new Set([...selectedIds.value, ...currentIds])]
		}
	}

	const toggleSelectUser = (id: number) => {
		if (selectedIds.value.includes(id)) {
			selectedIds.value = selectedIds.value.filter((item) => item !== id)
		} else {
			selectedIds.value.push(id)
		}
	}

	const handleSingleDelete = (id: number) => {
		if (confirm(t('Are you sure you want to delete this row?'))) {
			router.delete(`${routeUrl.value}/${id}`, {
				preserveScroll: true,
			})
		}
	}

	const handleBulkDelete = () => {
		if (selectedIds.value.length === 0) return

		const confirmationMessage =
			t('Are you sure you want to remove the selected rows?') +
			` (${selectedIds.value.length})`

		if (confirm(confirmationMessage)) {
			router.post(
				`${routeUrl.value}/bulk-delete`,
				{ ids: selectedIds.value },
				{
					onSuccess: () => {
						selectedIds.value = []
					},
				},
			)
		}
	}

	return {
		selectedIds,
		isAllSelected,
		toggleSelectAll,
		toggleSelectUser,
		handleSingleDelete,
		handleBulkDelete,
	}
}
