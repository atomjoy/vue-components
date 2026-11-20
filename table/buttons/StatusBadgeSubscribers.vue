<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
	defineProps<{
		status: 'pending' | 'confirmed' | 'rejected' | string
	}>(),
	{
		status: 'pending',
	},
)

const styles: Record<string, string> = {
	pending: 'bg-blue-50 text-blue-800 border-blue-200',
	rejected: 'bg-rose-50 text-rose-800 border-rose-200',
	confirmed: 'bg-lime-50 text-lime-800 border-lime-200',
}

const badgeClass = computed(
	() => styles[props.status] || 'bg-gray-50 text-gray-800 border-gray-200',
)
</script>

<template>
	<span
		:class="[
			'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium capitalize',
			badgeClass,
		]"
	>
		{{ props.status }}
	</span>
</template>
