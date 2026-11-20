<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { router } from '@inertiajs/vue3'

interface GalleryItem {
	id: number | string
	image: string
}

const list = ref<GalleryItem[]>([])
const activeImage = ref<string | null>(null)

const openLightbox = (imageName: string) => {
	activeImage.value = imageName
	window.addEventListener('keydown', handleKeyDown)
}

const closeLightbox = () => {
	activeImage.value = null
	window.removeEventListener('keydown', handleKeyDown)
}

const handleKeyDown = (e: KeyboardEvent) => {
	if (e.key === 'Escape') closeLightbox()
}

onUnmounted(() => {
	window.removeEventListener('keydown', handleKeyDown)
})

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
	<div class="my-8 grid w-full grid-cols-3 gap-4 px-8 max-md:grid-cols-2">
		<div v-if="list.length < 1" class="p-6 text-center">Dodaj zdjęcia do galerii</div>
		<div
			v-for="item in list"
			:key="item.id"
			class="cursor-pointer border p-2 transition duration-200 hover:opacity-80"
			@click="openLightbox(item.image)"
		>
			<img :src="item.image" alt="Zdjęcie" class="aspect-video w-full object-cover" />
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
			alt="Miniaturka"
			class="max-h-[90vh] max-w-[90vw] rounded object-contain shadow-2xl transition-transform duration-300"
			:class="activeImage ? 'scale-100' : 'scale-95'"
		/>
	</div>
</template>
