<script setup lang="ts">
import Eyebrow from '@/components/atoms/Eyebrow.vue'
import SectionDescription from '@/components/atoms/SectionDescription.vue'
import SectionTitle from '@/components/atoms/SectionTitle.vue'
import SectionWrapper from '@/components/atoms/SectionWrapper.vue'
import ContactForm from '@/components/elements/ContactForm.vue'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
</script>

<template>
	<section id="kontakt">
		<SectionWrapper>
			<Eyebrow>{{ t('Kontakt') }}</Eyebrow>
			<SectionTitle>
				{{ t('Startujesz Nowy') }}
				<span class="text-custom">{{ t('Projekt') }}</span>
			</SectionTitle>
			<SectionDescription>
				Opisz w kilku zdaniach, czego potrzebujesz? Odezwę się z konkretnymi pytaniami i
				propozycją kolejnych kroków. Bez zobowiązań. Zwykle odpowiadam w ciągu 24 godzin,
				Działam na terenie miasta Przasnysz i zdalnie w całej Polsce! Nie lubisz formularzy
				napisz wiadomość e-mail:
				<a :href="'mailto:' + t('company.email')" class="hover:text-custom font-bold">
					{{ t('company.email') }}
				</a>
				lub zadzwoń
				<a :href="'tel:' + t('company.phone')" class="hover:text-custom font-bold">
					{{ t('company.phone') }} </a
				>.
			</SectionDescription>
			<ContactForm />
		</SectionWrapper>
	</section>
</template>
