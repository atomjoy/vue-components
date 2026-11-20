<script setup lang="ts">
import { onMounted, onUnmounted, ref, computed } from 'vue'
import { router } from '@inertiajs/vue3'

interface GalleryItem {
	id: number | string
	image: string
}

const list = ref<GalleryItem[]>([])
const activeIndex = ref<number | null>(null)

const activeImage = computed(() => {
	if (activeIndex.value === null || !list.value[activeIndex.value]) return null
	return list.value[activeIndex.value].image
})

const openLightbox = (index: number) => {
	activeIndex.value = index
	window.addEventListener('keydown', handleKeyDown)
}

const closeLightbox = () => {
	activeIndex.value = null
	window.removeEventListener('keydown', handleKeyDown)
}

const setActiveIndex = (index: number) => {
	activeIndex.value = index
}

const handleKeyDown = (e: KeyboardEvent) => {
	if (e.key === 'Escape') closeLightbox()
	if (activeIndex.value === null) return

	if (e.key === 'ArrowRight') {
		activeIndex.value = (activeIndex.value + 1) % list.value.length
	}
	if (e.key === 'ArrowLeft') {
		activeIndex.value = (activeIndex.value - 1 + list.value.length) % list.value.length
	}
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
	<div class="my-8 grid w-full grid-cols-3 gap-4 max-md:grid-cols-2">
		<div v-if="list.length < 1" class="p-6 text-center">Dodaj zdjęcia do galerii</div>
		<div
			v-for="(item, index) in list"
			:key="item.id"
			class="border-input cursor-pointer rounded border p-2 transition duration-200 hover:opacity-80"
			@click="openLightbox(index)"
		>
			<img :src="item.image" alt="Zdjęcie" class="aspect-video w-full rounded object-cover" />
		</div>
	</div>

	<div
		@click="closeLightbox"
		:class="[
			'fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/90 p-4 backdrop-blur-sm transition-all duration-300 ease-in-out',
			activeIndex !== null
				? 'pointer-events-auto opacity-100'
				: 'pointer-events-none opacity-0',
		]"
	>
		<div class="flex flex-1 items-center justify-center p-4" @click.stop>
			<img
				v-if="activeImage"
				:src="activeImage"
				alt="Zdjęcie powiększone"
				class="max-h-[75vh] max-w-[90vw] cursor-zoom-out rounded object-contain shadow-2xl transition-transform duration-300"
				:class="activeIndex !== null ? 'scale-100' : 'scale-95'"
				@click="closeLightbox"
			/>
		</div>

		<div
			v-if="list.length > 1 && activeIndex !== null"
			class="flex max-w-full gap-2 overflow-x-auto p-4"
			@click.stop
		>
			<button
				v-for="(item, index) in list"
				:key="'thumb-' + item.id"
				class="h-16 w-24 shrink-0 overflow-hidden rounded border-2 transition duration-200"
				:class="
					index === activeIndex
						? 'scale-105 border-white opacity-100'
						: 'border-transparent opacity-50 hover:opacity-100'
				"
				@click="setActiveIndex(index)"
			>
				<img :src="item.image" alt="Miniaturka" class="h-full w-full object-cover" />
			</button>
		</div>
	</div>
</template>
