<script setup lang="ts">
const props = withDefaults(
	defineProps<{
		name: string | null
		email: string | null
		phone: string | null
	}>(),
	{
		name: null,
		email: null,
		phone: null,
	},
)
</script>

<template>
	<div class="flex flex-col gap-1 text-sm">
		<span v-if="props.name" class="font-medium">
			{{ props.name }}
		</span>
		<a
			v-if="props.email"
			:href="`mailto:${props.email}`"
			class="hover:text-custom truncate hover:underline"
		>
			{{ props.email }}
		</a>
		<a
			v-if="props.phone"
			:href="`tel:${props.phone}`"
			class="hover:text-custom text-gray-500 hover:underline"
		>
			{{ props.phone }}
		</a>
	</div>
</template>
