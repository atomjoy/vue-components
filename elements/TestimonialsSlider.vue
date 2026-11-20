<script setup lang="ts">
import VoteStars from '@/components/atoms/VoteStars.vue'
import { loadSplide } from '@/utils/loadSplide'
import { onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
defineProps<{
	items: any
}>()

onMounted(() => {
	loadSplide()
})
</script>

<template>
	<div class="splide float-left mb-8 w-full bg-transparent" aria-label="List">
		<div class="splide__track">
			<ul class="splide__list">
				<li class="splide__slide" v-for="i in items" :key="i.id">
					<div class="float-left w-full p-6 text-center">
						<div class="text-center">
							<img
								:src="i.image ?? '/default/article/no-author.webp'"
								alt=""
								class="border-custom mb-4 inline-block h-25 w-25 rounded-[50%] border-4"
							/>
							<!-- <div v-if="!i.image" class="h-26 bg-transparent"></div> -->
						</div>
						<div class="mb-4 px-6 dark:text-black">{{ t(i.message) }}</div>
						<div class="mb-4 font-medium dark:text-black">
							{{ i.name }}, {{ i.company }}
						</div>
						<div class="mb-4 px-6">
							<div class="inline-block dark:text-black">
								<VoteStars :vote="i.vote" /> ({{ Number(i.vote).toFixed(1) }})
							</div>
						</div>
					</div>
				</li>
			</ul>
		</div>
	</div>
</template>
