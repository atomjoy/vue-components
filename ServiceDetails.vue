<script setup lang="ts">
import { show } from '@/routes/services'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

defineProps<{
	item: any
}>()
</script>

<template>
	<div
		class="border-box hover:bg-custom/20 border-custom mb-6 flex w-full flex-col rounded-2xl border transition-all sm:max-w-[48%] md:max-w-[32%]"
	>
		<div class="grow p-6">
			<span
				class="bg-custom -mt-6 flex h-11 w-11 items-center justify-center rounded-b-xl rounded-bl-xl p-3"
			>
				<i class="text-2xl text-white" :class="item.icon"></i>
			</span>

			<div class="flex h-full flex-col items-stretch">
				<h3 class="mt-8 mb-2 gap-2 text-2xl font-medium">
					<a :href="show(item.slug).url">
						{{ t(item?.name) }}
					</a>
				</h3>
				<div class="h-full grow">
					{{ t(item?.excerpt) }}
				</div>
				<div v-if="item.price" class="mb-2 text-xl font-medium">{{ item?.price }}</div>
			</div>
		</div>
		<img
			v-if="item.image"
			alt="Zdjęcie"
			:src="item.image"
			class="h-56 w-full rounded-b-2xl rounded-bl-2xl object-cover"
		/>
	</div>
</template>
