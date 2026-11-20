<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

defineProps<{
	item: any
}>()

const showAfter = ref(false)

function toggle() {
	showAfter.value = !showAfter.value
}
</script>

<template>
	<div
		class="border-box bg-custom/10 mb-6 flex w-full flex-col rounded-2xl sm:max-w-[48%] md:max-w-[32%]"
	>
		<div class="border-b-custom grow border-b-2 p-4 py-2">
			<h3 class="text-custom my-1 text-sm font-medium">{{ t(item.name) }}</h3>
		</div>

		<!-- Kontener na zdjęcia i guzik -->
		<div class="relative h-56 w-full overflow-hidden rounded-b-2xl">
			<button
				v-if="item.image_after"
				class="bg-custom/70 hover:bg-custom absolute top-3 right-3 z-10 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full shadow-md transition-transform hover:scale-105"
				@click="toggle"
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
</template>
