<script setup lang="ts">
import Eyebrow from '@/components/atoms/Eyebrow.vue'
import SectionDescription from '@/components/atoms/SectionDescription.vue'
import SectionTitle from '@/components/atoms/SectionTitle.vue'
import SectionWrapper from '@/components/atoms/SectionWrapper.vue'
import InvisibleItem from '@/components/atoms/InvisibleItem.vue'
import EmployeeDetails from '@/components/elements/EmployeeDetails.vue'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

defineProps<{
	items: any[]
}>()
</script>

<template>
	<section id="employees">
		<SectionWrapper>
			<div class="mx-auto mb-16 max-w-3xl text-center">
				<Eyebrow>{{ t('Zaspół') }}</Eyebrow>
				<SectionTitle>
					{{ t('Nasz') }}
					<span class="text-custom">{{ t('Zespół') }}</span>
				</SectionTitle>
				<SectionDescription>
					{{ t('Nasi pracownicy.') }}
				</SectionDescription>
			</div>

			<div v-if="items.length < 1">{{ t('Brak danych.') }}</div>

			<div
				class="services-container flex w-full flex-wrap items-stretch justify-between gap-[1%] pb-2.5"
			>
				<template v-for="item in items">
					<EmployeeDetails :item="item" />
				</template>
				<InvisibleItem />
			</div>

			<slot />
		</SectionWrapper>
	</section>
</template>
