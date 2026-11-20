<script setup lang="ts">
import SectionWrapper from '@/components/atoms/SectionWrapper.vue'
import { ArrowRight } from '@lucide/vue'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

const props = defineProps<{
	cityName: string | null
}>()
</script>

<template>
	<section id="hero">
		<SectionWrapper>
			<div class="md:flex md:gap-[1%]">
				<div class="w-full p-6 pl-0">
					<h1 class="mb-6 text-center text-6xl md:text-left">
						{{ t('Tworzenie Stron Internetowych') }}
						<span class="text-custom">{{ cityName ?? 'Przasnysz' }}</span>
					</h1>
					<p class="mb-8 max-md:text-center">
						{{
							t(
								'Wdrażam nowoczesne strony internetowe i aplikacje webowe. Każdą stronę dopasowuję do indywidualnych wymagań technicznych klienta. Dbam o pełną spójność na każdym etapie, bez kompromisów między designem a kodem.',
							)
						}}
					</p>
					<div class="text-center md:text-left">
						<a
							href="#kontakt"
							class="bg-custom mx-auto inline-flex grow-0 gap-2 rounded-3xl px-6 py-4 text-black hover:animate-[shake_0.5s_ease-in-out_infinite] hover:text-white hover:shadow-xl"
						>
							{{ t('Zapytaj o projekt') }} <ArrowRight class="text-sm" />
						</a>
					</div>
				</div>
				<div class="w-full p-6 pr-0">
					<img
						alt="Zdjęcie główne"
						src="https://cdn.dribbble.com/userupload/14180802/file/original-7bc204c9edd2be041cd2eedeb9138ce9.jpg"
						class="max-h-96 w-full rounded-2xl object-cover"
					/>
				</div>
			</div>
		</SectionWrapper>
	</section>
</template>
