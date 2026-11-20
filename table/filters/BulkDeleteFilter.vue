<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Trash2 } from '@lucide/vue'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

defineProps<{
	selectedCount: number
}>()

const emit = defineEmits<{
	(e: 'bulkDelete'): void
}>()
</script>
<template>
	<!-- Pasek akcji masowych -->
	<div
		v-if="selectedCount > 0"
		class="mt-4 flex items-center justify-between rounded-lg border border-dashed border-red-100 bg-red-50/50 p-4"
	>
		<span class="text-sm font-medium">
			{{ t('Selected users:') }}
			<span class="text-primary font-bold">{{ selectedCount }}</span>
		</span>
		<Button variant="destructive" size="sm" class="gap-2" @click="emit('bulkDelete')">
			<Trash2 class="h-4 w-4" /> {{ t('Delete selected') }}
		</Button>
	</div>
</template>
