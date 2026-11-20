<script setup lang="ts">
import VoteStars from '@/components/atoms/VoteStars.vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

defineProps<{
	item: any
}>()
</script>

<template>
	<div
		class="border-box border-input mb-6 w-full rounded-xl border bg-gray-50 p-6 dark:bg-[#131313]"
	>
		<h3 class="mb-3 flex h-11 items-end font-medium">
			<img
				:src="item.image ?? '/default/article/no-author.webp'"
				class="mr-2 inline h-10 w-10 rounded-4xl"
				alt=""
			/>
			<span
				class="inline rounded-xl bg-black px-2 py-1 text-white dark:bg-white dark:text-black"
			>
				{{ item.name }}
			</span>
		</h3>
		<div class="rounded-xl">
			<div class="flex items-center justify-between gap-2">
				<span class="text-3xl"><i class="fa-solid fa-quote-right"></i></span>
				<div class="flex items-center gap-1">
					<VoteStars :vote="item.vote" class="text-right" />
					<span class="text-xl font-medium">{{ Number(item.vote).toFixed(1) }}</span>
				</div>
			</div>
			<p class="mt-2 text-sm font-light tracking-wide">
				{{ t(item.message) }}
			</p>

			<div class="border-input mt-3 border-t pt-2 text-xs opacity-80">
				{{ item.company ?? 'Klient' }}
			</div>
		</div>
	</div>
</template>
