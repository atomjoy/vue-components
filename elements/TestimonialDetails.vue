<script setup lang="ts">
import VoteStars from '@/components/atoms/VoteStars.vue'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

defineProps<{
	item: any
}>()
</script>

<template>
	<div class="border-box mb-6 w-full sm:max-w-[48%] md:max-w-[32%]">
		<h3 class="mb-3 flex h-11 items-end font-medium">
			<img
				:src="item.image ?? '/default/article/no-author.webp'"
				class="mr-2 inline h-10 w-10 rounded-4xl"
				alt=""
			/>
			<span
				class="inline rounded-xl bg-black p-1 px-2 text-white dark:bg-white dark:text-black"
			>
				{{ item.name }}
			</span>
		</h3>
		<div class="rounded-xl bg-white p-4 dark:bg-[#131313]">
			<div class="flex items-center gap-2">
				<span class="w-full text-3xl"><i class="fa-solid fa-quote-right"></i></span>
				<div class="flex items-stretch gap-1">
					<VoteStars :vote="item.vote" class="text-right" />
					<span class="text-xl">{{ Number(item.vote).toFixed(1) }}</span>
				</div>
			</div>
			<p class="text-sm font-light tracking-wide">
				{{ t(item.message) }}
			</p>

			<div class="border-input mt-3 border-t pt-2">
				{{ item.company ?? 'Klient' }}
			</div>
		</div>
	</div>
</template>
