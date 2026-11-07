import { ref, type Ref } from 'vue'
import { router } from '@inertiajs/vue3'
import { useI18n } from 'vue-i18n'

// Przekazujemy selectedIds jako reaktywny argument
export function useResourceActions(selectedIds: Ref<number[]>) {
	const { t } = useI18n()
	const routeUrl = ref<string>('')

	// Jedyna funkcja konfiguracyjna
	const setRouteUrl = (url: string) => {
		routeUrl.value = url
	}

	// W szablonie wywołujesz bez parametrów: @click="handleBulkDelete"
	const handleBulkDelete = () => {
		if (!routeUrl.value || selectedIds.value.length === 0) return

		const confirmationMessage =
			t('Are you sure you want to remove the selected users?') +
			` (${selectedIds.value.length})`

		if (confirm(confirmationMessage)) {
			router.post(
				`${routeUrl.value}/bulk-delete`,
				{
					ids: selectedIds.value, // Używa referencji przekazanej do composable
				},
				{
					onSuccess: () => {
						selectedIds.value = [] // Czyści tablicę w komponencie
					},
				},
			)
		}
	}

	const handleSingleDelete = (id: number) => {
		if (!routeUrl.value) return

		if (confirm(t('Are you sure you want to delete this user?'))) {
			router.delete(`${routeUrl.value}/${id}`, {
				preserveScroll: true,
			})
		}
	}

	return {
		setRouteUrl,
		handleBulkDelete,
		handleSingleDelete,
	}
}

// <script setup lang="ts">
// import { ref, onMounted } from 'vue'
// import { useResourceActions } from '@/composables/useResourceActions'
// // Definiujesz stan w komponencie
// const selectedUsers = ref<number[]>([])
// // Przekazujesz referencję tutaj. handleBulkDelete automatycznie z niej skorzysta!
// const { setRouteUrl, handleBulkDelete, handleSingleDelete } = useResourceActions(selectedUsers)
// onMounted(() => {
//   setRouteUrl('/admin/users')
// })
// </script>
// <template>
//   <div>
//     <!-- Szablon jest czysty, bez przekazywania jakichkolwiek parametrów w kliku -->
//     <button @click="handleBulkDelete" :disabled="selectedUsers.length === 0">
//       Usuń zaznaczone ({{ selectedUsers.length }})
//     </button>
//     <button @click="handleSingleDelete(user.id)">Usuń jednego</button>
//   </div>
// </template>
