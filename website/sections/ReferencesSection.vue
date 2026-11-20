<script setup lang="ts">
import Eyebrow from '@/components/atoms/Eyebrow.vue'
import SectionDescription from '@/components/atoms/SectionDescription.vue'
import SectionTitle from '@/components/atoms/SectionTitle.vue'
import SectionWrapper from '@/components/atoms/SectionWrapper.vue'
import ReferenceDetails from '@/components/elements/ReferenceDetails.vue'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

defineProps<{
	items: any[]
}>()
</script>

<template>
	<section id="testimonials">
		<SectionWrapper>
			<div class="overflow-hidden rounded-3xl py-8">
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

				<div class="w-full">
					<template v-for="item in items">
						<ReferenceDetails :item="item" />
					</template>
				</div>
			</div>
		</SectionWrapper>
	</section>
</template>
