<script setup lang="ts">
import { router } from '@inertiajs/vue3'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

interface Props {
	payload: any
	is_deleted: boolean
}

const props = defineProps<Props>()

const restoreDeal = (): void => {
	if (confirm('Restore record?')) {
		router.put(
			'/admin/deals/' + props.payload.id + '/restore',
			{},
			{
				onSuccess: (): void => {
					console.log('Restored')
				},
			},
		)
	}
}
</script>

<template>
	<div class="p-0">
		<div v-if="is_deleted" class="mb-4 rounded bg-yellow-100 p-4 text-yellow-800">
			<p class="mb-2">{{ t('This deal is trashed') }}</p>

			<button
				@click="restoreDeal"
				class="rounded bg-green-600 px-4 py-2 font-semibold text-white shadow hover:bg-green-700"
			>
				{{ t('Restore') }}
			</button>
		</div>
	</div>
</template>
