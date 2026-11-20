<script setup lang="ts">
import Eyebrow from '@/components/atoms/Eyebrow.vue'
import SectionDescription from '@/components/atoms/SectionDescription.vue'
import SectionTitle from '@/components/atoms/SectionTitle.vue'
import SectionWrapper from '@/components/atoms/SectionWrapper.vue'
import PricingDetails from '@/components/elements/PricingDetails.vue'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

defineProps<{
	items: any[]
}>()
</script>

<template>
	<section id="pricing">
		<SectionWrapper>
			<div class="mx-auto mb-16 max-w-3xl text-center">
				<Eyebrow>{{ t('Cennik') }}</Eyebrow>
				<SectionTitle
					>{{ t('Dostępne') }}
					<span class="text-custom">{{ t('Pakiety') }}</span>
				</SectionTitle>
				<SectionDescription>
					{{ t('Wybierz pakiet spełniający Twoje wymagania. Zero ukrytych kosztów.') }}
				</SectionDescription>
			</div>

			<div v-if="items.length < 1">{{ t('Brak danych.') }}</div>

			<div
				class="services-container flex w-full flex-wrap items-stretch justify-between gap-[1%] pb-2.5"
			>
				<template v-for="item in items">
					<PricingDetails :item="item" />
				</template>

				<p>
					{{
						t(
							'Niedrogi hosting dla Twojej strony internetowej z bezpłatnymi certyfikatami SSL, 5GB powierzchni na dane i nielimitowanym transferem danych już od',
						)
					}}
					<b>+50PLN</b> {{ t('za rok') }}.
					{{
						t(
							'Wszystkie kwoty widoczne w naszym serwisie są cenami brutto. Oznacza to, że zawierają już podatek VAT. Dokładnie wiesz, ile płacisz, od pierwszego kliknięcia do finalizacji zamówienia.',
						)
					}}
				</p>
			</div>
		</SectionWrapper>
	</section>
</template>
