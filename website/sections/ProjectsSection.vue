<script setup lang="ts">
import Eyebrow from '@/components/atoms/Eyebrow.vue'
import SectionDescription from '@/components/atoms/SectionDescription.vue'
import SectionTitle from '@/components/atoms/SectionTitle.vue'
import SectionWrapper from '@/components/atoms/SectionWrapper.vue'
import InvisibleItem from '@/components/atoms/InvisibleItem.vue'
import ProjectDetails from '@/components/elements/ProjectDetails.vue'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

defineProps<{
	items: any[]
}>()
</script>

<template>
	<section id="projects">
		<SectionWrapper>
			<div class="mx-auto mb-16 max-w-3xl text-center">
				<Eyebrow>{{ t('Projekty') }}</Eyebrow>
				<SectionTitle>
					{{ t('Ostatnie') }}
					<span class="text-custom">{{ t('Realizacje') }}</span>
				</SectionTitle>
				<SectionDescription>
					{{
						t(
							'Przedstawiam przegląd wybranych projektów, które najlepiej definiują standardy mojej pracy. Zapraszam do zapoznania się ze szczegółowymi case studies, które pokazują moje realne możliwości oraz skuteczność w rozwiązywaniu konkretnych problemów.',
						)
					}}
				</SectionDescription>
			</div>

			<div v-if="items.length < 1">{{ t('Brak danych.') }}</div>

			<div
				class="services-container flex w-full flex-wrap items-stretch justify-between gap-[1%] pb-2.5"
			>
				<template v-for="item in items">
					<ProjectDetails :item="item" />
				</template>
				<InvisibleItem />
			</div>

			<slot />
		</SectionWrapper>
	</section>
</template>
