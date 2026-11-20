<script setup lang="ts">
import Eyebrow from '@/components/atoms/Eyebrow.vue'
import FaqDetails from '@/components/elements/FaqDetails.vue'
import SectionDescription from '@/components/atoms/SectionDescription.vue'
import SectionTitle from '@/components/atoms/SectionTitle.vue'
import SectionWrapper from '@/components/atoms/SectionWrapper.vue'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

defineProps<{
	items: any[]
}>()
</script>

<template>
	<section id="faqs">
		<SectionWrapper>
			<div class="mx-auto mb-16 max-w-3xl text-center">
				<Eyebrow>{{ t('Faqs') }}</Eyebrow>
				<SectionTitle>
					{{ t('Często Zadawane') }}
					<span class="text-custom">{{ t('Pytania') }}</span>
				</SectionTitle>
				<SectionDescription>
					{{ t('Odpowiedzi na najważniejsze pytania dotyczące stron internetowych.') }}
				</SectionDescription>
			</div>

			<div v-if="items.length < 1">{{ t('Brak danych.') }}</div>

			<div class="faq-container w-full pb-2.5">
				<template v-for="item in items">
					<FaqDetails :question="item.question" :answer="item.answer" email="" />
				</template>
			</div>
		</SectionWrapper>
	</section>
</template>
