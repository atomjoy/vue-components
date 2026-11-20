<script setup lang="ts">
import Eyebrow from '@/components/atoms/Eyebrow.vue'
import SectionDescription from '@/components/atoms/SectionDescription.vue'
import SectionTitle from '@/components/atoms/SectionTitle.vue'
import SectionWrapper from '@/components/atoms/SectionWrapper.vue'
import WorkDetails from '@/components/elements/WorkDetails.vue'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

defineProps<{
	items: any[]
}>()
</script>

<template>
	<section id="works">
		<SectionWrapper>
			<div class="mx-auto mb-16 max-w-3xl text-center">
				<Eyebrow>{{ t('Kariera') }}</Eyebrow>
				<SectionTitle>
					{{ t('Oferty') }}
					<span class="text-custom">{{ t('Pracy') }}</span>
				</SectionTitle>
				<SectionDescription>
					{{ t('Aktualne oferty pracy i rekrutacje. Dołącz do naszego zespołu!') }}
				</SectionDescription>
			</div>

			<div v-if="items.length < 1">{{ t('Brak danych.') }}</div>

			<div
				class="works-container flex w-full flex-wrap items-stretch justify-between gap-[1%] pb-2.5"
			>
				<template v-for="item in items">
					<WorkDetails :item="item" />
				</template>
			</div>

			<slot />
		</SectionWrapper>
	</section>
</template>
