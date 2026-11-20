<script setup lang="ts">
interface RowData {
	name: string
	email: string
}

defineProps<{
	row: RowData
}>()
</script>

<template>
	<div class="flex flex-col">
		<span class="text-foreground font-medium">
			{{ row.name }}
		</span>
		<a :href="`mailto:${row.email}`" class="text-muted-foreground hover:text-custom text-sm">
			{{ row.email }}
		</a>
	</div>
</template>
