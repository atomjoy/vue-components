<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
	defineProps<{
		status:
			| 'draft'
			| 'pending'
			| 'preparing'
			| 'processing'
			| 'sent'
			| 'lost'
			| 'suspended'
			| string
	}>(),
	{
		status: 'draft',
	},
)

const styles: Record<string, string> = {
	draft: 'bg-gray-700 text-white border-gray-900',
	pending: 'bg-yellow-400 text-black border-yellow-400',
	preparing: 'bg-blue-50 text-blue-800 border-blue-200',
	processing: 'bg-lime-500 text-white border-lime-500',
	sent: 'bg-emerald-50 text-emerald-800 border-emerald-200',
	lost: 'bg-rose-50 text-rose-800 border-rose-200',
	suspended: 'bg-zinc-50 text-zinc-800 border-zinc-300',
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
