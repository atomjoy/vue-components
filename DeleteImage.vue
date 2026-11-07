<script setup lang="ts">
import { ref } from 'vue'
import { router } from '@inertiajs/vue3'

interface Props {
	url: string
}

const props = defineProps<Props>()
const isDeleting = ref(false)

const deleteImage = () => {
	if (!confirm('Czy na pewno chcesz usunąć to zdjęcie?')) return

	router.post(
		props.url,
		{},
		{
			preserveState: true,
			onBefore: () => {
				isDeleting.value = true
			},
			onSuccess: (page: any) => {
				const message = page.props.flash?.success || page.props.flash?.message
				if (message) {
					alert(`Sukces: ${message}`)
				}
			},
			onError: (errors) => {
				console.error('Błąd podczas usuwania:', errors)
				alert('Nie udało się usunąć zdjęcia.')
			},
			onFinish: () => {
				isDeleting.value = false
			},
		},
	)
}
</script>

<template>
	<div class="my-2 flex items-center gap-4 rounded">
		<button
			@click="deleteImage"
			:disabled="isDeleting"
			class="rounded bg-red-600 px-3 py-1 text-sm text-white hover:bg-red-700 disabled:bg-red-300"
		>
			{{ isDeleting ? 'Usuwanie...' : 'Usuń zdjęcie' }}
		</button>
	</div>
</template>
