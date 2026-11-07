<script setup lang="ts">
import Eyebrow from '@/components/atoms/Eyebrow.vue'
import SectionDescription from '@/components/atoms/SectionDescription.vue'
import SectionTitle from '@/components/atoms/SectionTitle.vue'
import SectionWrapper from '@/components/atoms/SectionWrapper.vue'
import InvisibleItem from '@/components/atoms/InvisibleItem.vue'
import ServiceDetails from '@/components/elements/ServiceDetails.vue'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

defineProps<{
	items: any[]
}>()
</script>

<template>
	<section id="services">
		<SectionWrapper>
			<div class="mx-auto mb-16 max-w-3xl text-center">
				<Eyebrow>{{ t('Usługi') }}</Eyebrow>
				<SectionTitle>
					{{ t('Tworzenie') }}
					<span class="text-custom">{{ t('Oprogramowania') }}</span>
				</SectionTitle>
				<SectionDescription>
					{{
						t(
							'Twoja nowa strona www od pomysłu do pełnego sukcesu. Dbamy o każdy detal procesu twórczego: od makiety po stabilne wdrożenie i optymalizację SEO. Otrzymujesz od nas w pełni gotową, prostą w zarządzaniu stronę internetową oraz wsparcie, na które zawsze możesz liczyć.',
						)
					}}
				</SectionDescription>
			</div>

			<div v-if="items.length < 1">{{ t('Brak danych.') }}</div>

			<div
				class="services-container flex w-full flex-wrap items-stretch justify-between gap-[1%] pb-2.5"
			>
				<template v-for="item in items">
					<ServiceDetails :item="item" />
				</template>
				<InvisibleItem />
			</div>

			<slot />
		</SectionWrapper>
	</section>
</template>
