<script setup lang="ts">
import { ref, computed, watch, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

const props = defineProps<{
	item: any
}>()

const showAfter = ref(false)
const isFullscreen = ref(false)
const currentImageSrc = computed(() => {
	return props.item.image_after && showAfter.value ? props.item.image_after : props.item.image
})

function toggle() {
	showAfter.value = !showAfter.value
}

function openFullscreen() {
	isFullscreen.value = true
}

function closeFullscreen() {
	isFullscreen.value = false
}

watch(isFullscreen, (value) => {
	if (value) {
		document.body.classList.add('overflow-hidden')
	} else {
		document.body.classList.remove('overflow-hidden')
	}
})

onUnmounted(() => {
	document.body.classList.remove('overflow-hidden')
})
</script>

<template>
	<div
		class="border-box bg-custom/10 mb-6 flex w-full flex-col rounded-2xl sm:max-w-[48%] md:max-w-[32%]"
	>
		<div class="border-b-custom grow border-b-2 p-4 py-2">
			<h3 class="text-custom my-1 text-sm font-medium">{{ t(item.name) }}</h3>
		</div>

		<!-- Kontener na zdjęcia i guzik -->
		<div
			class="relative h-56 w-full cursor-pointer overflow-hidden rounded-b-2xl"
			@click="openFullscreen"
		>
			<button
				v-if="item.image_after"
				class="bg-custom/70 hover:bg-custom absolute top-3 right-3 z-10 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full shadow-md transition-transform hover:scale-105"
				@click.stop="toggle"
			>
				<i
					class="fa-solid fa-repeat text-base transition-transform duration-300"
					:class="{ 'rotate-90': showAfter }"
				></i>
			</button>

			<img
				:alt="item.description"
				:src="item.image"
				class="absolute inset-0 h-full w-full object-cover"
			/>

			<img
				v-if="item.image_after && showAfter"
				alt="Zdjęcie po"
				:src="item.image_after"
				class="absolute inset-0 h-full w-full object-cover"
			/>
		</div>
	</div>

	<!-- Modal pełnoekranowy (Lightbox) -->
	<Transition
		enter-active-class="transition duration-200 ease-out"
		enter-from-class="opacity-0"
		enter-to-class="opacity-100"
		leave-active-class="transition duration-150 ease-in"
		leave-from-class="opacity-100"
		leave-to-class="opacity-0"
	>
		<div
			v-if="isFullscreen"
			class="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
			@click="closeFullscreen"
		>
			<button
				class="absolute top-6 right-6 z-50 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
				@click="closeFullscreen"
			>
				<i class="fa-solid fa-xmark text-xl"></i>
			</button>

			<img
				:src="currentImageSrc"
				:alt="item.description"
				class="max-h-full max-w-full rounded-lg object-contain shadow-2xl"
				@click.stop
			/>
		</div>
	</Transition>
</template>
