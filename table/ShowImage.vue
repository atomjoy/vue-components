<script setup lang="ts">
interface RowData {
	image?: string | null
}

const props = defineProps<{
	row: RowData
}>()

const img = props.row.image ? props.row.image : '/default/article/no-image.webp'
</script>

<template>
	<a v-if="img" :href="img" target="_blank" class="hover:text-custom">
		<img :src="img" class="aspect-video h-12 object-cover" alt="Image" />
	</a>
</template>
