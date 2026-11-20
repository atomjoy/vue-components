<script setup lang="ts">
import { BadgeCheck } from '@lucide/vue'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

defineProps<{
	item: any
}>()
</script>

<template>
	<div
		class="border-box border-custom mb-6 flex w-full flex-col rounded-2xl border sm:max-w-[48%] md:max-w-[32%]"
		:class="{ 'bg-custom/30': item.popular }"
	>
		<div class="grow p-6">
			<p class="mb-1 h-8 text-right">
				<span
					v-if="item.popular"
					class="text-custom rounded-2xl bg-black px-4 py-1 font-medium uppercase"
					>{{ t('Najczęściej wybierany') }}</span
				>
			</p>
			<h3 class="mt-1 mb-2 flex flex-wrap items-center gap-2 text-xl">
				{{ t(item.title) }}
			</h3>
			<p class="mb-3 text-sm">
				{{ t(item.description) }}
			</p>
			<div>{{ t('zawiera VAT') }}</div>
			<div class="mb-3 text-4xl font-bold">
				{{ item.price }}
			</div>

			<ul>
				<li v-for="l in item.list" class="mb-2 flex gap-2 text-sm">
					<span><BadgeCheck /></span> <span>{{ t(l) }}</span>
				</li>
			</ul>
		</div>
		<div class="w-full p-6">
			<a
				:href="item.url"
				:title="item.button"
				class="bg-custom block min-w-full rounded-3xl px-6 py-3 text-center font-semibold text-black uppercase hover:bg-black hover:text-white"
			>
				{{ t(item.button) }}
			</a>
		</div>
	</div>
</template>
