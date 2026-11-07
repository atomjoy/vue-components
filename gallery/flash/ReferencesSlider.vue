<script setup lang="ts">
import VoteStars from '@/components/atoms/VoteStars.vue'
import { onMounted, ref } from 'vue'
import { router } from '@inertiajs/vue3'
import { loadSplide } from '@/utils/loadSplide'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

let list: any = ref([])

onMounted(() => {
	router.get(
		'/flash/references',
		{},
		{
			preserveState: true,
			preserveScroll: true,
			replace: true,
			onSuccess: (p: any) => {
				list.value = p.flash.data ?? []
				loadSplide()
			},
		},
	)
})
</script>

<template>
	<section class="splide float-left mb-8 w-full" aria-label="List">
		<div class="splide__track">
			<ul class="splide__list">
				<li class="splide__slide" v-for="i in list" :key="i.id">
					<div class="float-left w-full p-6 text-center">
						<div class="text-center">
							<img
								:src="'/image/' + i.image"
								alt="Image"
								class="mb-4 inline-block h-15 w-15 rounded-[50%]"
							/>
						</div>
						<div class="mb-4 px-6">{{ t(i.message) }}</div>
						<div class="mb-4 font-medium">{{ i.name }}, {{ i.company }}</div>
						<div class="mb-4 px-6">
							<div class="inline-block">
								<VoteStars :vote="i.vote" /> ({{ Number(i.vote).toFixed(1) }})
							</div>
						</div>
					</div>
				</li>
			</ul>
		</div>
	</section>
</template>
