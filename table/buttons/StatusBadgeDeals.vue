<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
	defineProps<{
		status: 'proposal_preparation' | 'won' | 'lost' | string
	}>(),
	{
		status: 'proposal_preparation',
	},
)

const styles: Record<string, string> = {
	proposal_preparation: 'bg-yellow-400 text-black border-yellow-400',
	proposal_sent: 'bg-blue-50 text-blue-800 border-blue-200',
	negotiations: 'bg-orange-50 text-orange-800 border-orange-300',
	won: 'bg-lime-500 text-white border-lime-500',
	lost: 'bg-rose-50 text-rose-800 border-rose-200',
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
