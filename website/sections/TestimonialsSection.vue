<script setup lang="ts">
import Eyebrow from '@/components/atoms/Eyebrow.vue'
import SectionDescription from '@/components/atoms/SectionDescription.vue'
import SectionTitle from '@/components/atoms/SectionTitle.vue'
import SectionWrapper from '@/components/atoms/SectionWrapper.vue'
import TestimonialDetails from '@/components/elements/TestimonialDetails.vue'
import InvisibleItem from '@/components/atoms/InvisibleItem.vue'
import { useI18n } from 'vue-i18n'
import TestimonialsSlider from '@/components/elements/TestimonialsSlider.vue'
const { t } = useI18n()

defineProps<{
	items: any[]
}>()
</script>

<template>
	<section id="testimonials">
		<SectionWrapper>
			<div class="overflow-hidden rounded-3xl bg-[#f4f8fb] px-[5%] py-8 dark:bg-[#060606]">
				<div class="mx-auto mb-16 max-w-3xl text-center">
					<Eyebrow>{{ t('Opinie') }}</Eyebrow>
					<SectionTitle>
						{{ t('Opinie') }}
						<span class="text-custom">{{ t('Klientów') }}</span>
					</SectionTitle>
					<SectionDescription>
						{{ t('Zobacz co nasi Kleinci pisza o naszych usługach.') }}
					</SectionDescription>
				</div>

				<div v-if="items.length < 1">{{ t('Brak danych.') }}</div>

				<div
					class="testimonials-container hidden w-full flex-wrap items-stretch justify-between gap-[1%] pb-2.5 md:flex"
				>
					<template v-for="item in items">
						<TestimonialDetails :item="item" />
					</template>
					<InvisibleItem />
				</div>

				<div class="mx-auto w-full md:hidden">
					<TestimonialsSlider :items="items" />
				</div>
			</div>
		</SectionWrapper>
	</section>
</template>
