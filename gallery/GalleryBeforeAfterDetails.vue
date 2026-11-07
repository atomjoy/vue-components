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

function handleKeyDown(e: KeyboardEvent) {
	if (!isFullscreen.value) return
	if (e.key === 'Escape') {
		closeFullscreen()
	} else if (e.key === 'ArrowLeft') {
		showAfter.value = false
	} else if (e.key === 'ArrowRight' && props.item.image_after) {
		showAfter.value = true
	}
}

watch(isFullscreen, (value) => {
	if (value) {
		document.body.classList.add('overflow-hidden')
		window.addEventListener('keydown', handleKeyDown)
	} else {
		document.body.classList.remove('overflow-hidden')
		window.removeEventListener('keydown', handleKeyDown)
	}
})

onUnmounted(() => {
	document.body.classList.remove('overflow-hidden')
	window.removeEventListener('keydown', handleKeyDown)
})
</script>

<template>
	<div
		class="border-box bg-custom/10 mb-6 flex w-full flex-col rounded-2xl sm:max-w-[48%] md:max-w-[32%]"
	>
		<div class="border-b-custom grow border-b-2 p-4 py-2">
			<h3 class="text-custom my-1 text-sm font-medium">{{ t(item?.name) }}</h3>
		</div>

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
			class="fixed inset-0 z-50 flex flex-col items-center justify-between bg-black/90 p-4 pb-8 backdrop-blur-sm"
			@click="closeFullscreen"
		>
			<div class="flex w-full justify-end p-2">
				<button
					class="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
					@click="closeFullscreen"
				>
					<i class="fa-solid fa-xmark text-xl"></i>
				</button>
			</div>

			<div class="flex max-h-[65vh] w-full items-center justify-center" @click.stop>
				<img
					:src="currentImageSrc"
					:alt="item.description"
					class="max-h-full max-w-full rounded-lg object-contain shadow-2xl"
				/>
			</div>

			<div
				v-if="item.image"
				class="flex gap-4 rounded-xl bg-white/5 p-3 backdrop-blur-md"
				@click.stop
			>
				<button
					class="relative h-16 w-20 overflow-hidden rounded-lg border border-white/20 transition-all duration-200 hover:opacity-80"
					:class="{
						'ring-custom scale-105 border-transparent ring-2': !showAfter,
						'opacity-50': showAfter,
					}"
					@click="showAfter = false"
				>
					<img :src="item.image" class="h-full w-full object-cover" alt="Miniatura" />
					<span
						class="absolute right-0 bottom-0 left-0 bg-black/60 py-0.5 text-center text-[10px] font-medium text-white"
					>
						{{ t('Po') }}
					</span>
				</button>

				<button
					v-if="item.image_after"
					class="relative h-16 w-20 overflow-hidden rounded-lg border border-white/20 transition-all duration-200 hover:opacity-80"
					:class="{
						'ring-custom scale-105 border-transparent ring-2': showAfter,
						'opacity-50': !showAfter,
					}"
					@click="showAfter = true"
				>
					<img
						:src="item.image_after"
						class="h-full w-full object-cover"
						alt="Miniatura"
					/>
					<span
						class="absolute right-0 bottom-0 left-0 bg-black/60 py-0.5 text-center text-[10px] font-medium text-white"
					>
						{{ t('Przed') }}
					</span>
				</button>
			</div>
		</div>
	</Transition>
</template>
