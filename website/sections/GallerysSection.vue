<script setup lang="ts">
import Eyebrow from '@/components/atoms/Eyebrow.vue'
import SectionDescription from '@/components/atoms/SectionDescription.vue'
import SectionTitle from '@/components/atoms/SectionTitle.vue'
import SectionWrapper from '@/components/atoms/SectionWrapper.vue'
import GalleryBeforeAfterDetails from '@/components/elements/GalleryBeforeAfterDetails.vue'
import InvisibleItem from '@/components/atoms/InvisibleItem.vue'
import { useI18n } from 'vue-i18n'
import GalleryGridThumbs from '@/components/elements/flash/GalleryGridThumbs.vue'
const { t } = useI18n()

defineProps<{
	items: any[]
}>()
</script>

<template>
	<section id="gallery">
		<SectionWrapper>
			<div class="mx-auto mb-16 max-w-3xl text-center">
				<Eyebrow>{{ t('Galeria') }}</Eyebrow>
				<SectionTitle
					>{{ t('Prace w') }}
					<span class="text-custom">{{ t('Galerii') }}</span>
				</SectionTitle>
				<SectionDescription>
					{{ t('Najciekawsze zdjęcia w naszym wykonaniu.') }}
				</SectionDescription>
			</div>

			<div v-if="items.length < 1">{{ t('Brak danych.') }}</div>

			<!-- Przed/Po galeria -->
			<div
				class="services-container flex w-full flex-wrap items-stretch justify-between gap-[1%]"
			>
				<template v-for="item in items">
					<GalleryBeforeAfterDetails :item="item" />
				</template>
				<InvisibleItem />
			</div>

			<!-- Normalna galeria -->
			<!-- <GalleryGridThumbs /> -->
		</SectionWrapper>
	</section>
</template>
