<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { router } from '@inertiajs/vue3'

interface GalleryItem {
	id: number | string
	image: string
}

const list = ref<GalleryItem[]>([])
const activeImage = ref<string | null>(null)

const openLightbox = (imageName: string) => {
	activeImage.value = imageName
}

const closeLightbox = () => {
	activeImage.value = null
}

onMounted(() => {
	router.get(
		'/flash/galleries',
		{},
		{
			preserveState: true,
			preserveScroll: true,
			replace: true,
			onSuccess: (p: any) => {
				list.value = p.flash.data ?? []
			},
		},
	)
})
</script>

<template>
	<div class="my-8 flex w-full flex-wrap gap-4 overflow-hidden px-8">
		<div
			v-for="item in list"
			:key="item.id"
			class="w-[calc(33.333%-11px)] cursor-pointer border p-2 transition duration-200 hover:opacity-80 max-md:w-[calc(50%-8px)]"
			@click="openLightbox(item.image)"
		>
			<img :src="item.image" alt="Image" class="aspect-video w-full object-cover" />
		</div>
	</div>

	<div
		@click="closeLightbox"
		:class="[
			'fixed inset-0 z-50 flex cursor-zoom-out items-center justify-center bg-black/80 p-4 backdrop-blur-sm transition-all duration-300 ease-in-out',
			activeImage ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0',
		]"
	>
		<img
			v-if="activeImage"
			:src="activeImage"
			alt="Enlarged Image"
			class="max-h-[90vh] max-w-[90vw] rounded object-contain shadow-2xl transition-transform duration-300"
			:class="activeImage ? 'scale-100' : 'scale-95'"
		/>
	</div>
</template>
