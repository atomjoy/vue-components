<script setup lang="ts">
import Eyebrow from '@/components/atoms/Eyebrow.vue'
import SectionDescription from '@/components/atoms/SectionDescription.vue'
import SectionTitle from '@/components/atoms/SectionTitle.vue'
import SectionWrapper from '@/components/atoms/SectionWrapper.vue'
import { ArrowRight } from '@lucide/vue'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

defineProps<{
	items: any[]
}>()
</script>

<template>
	<section class="steps-container bg-white">
		<SectionWrapper>
			<div class="mx-auto mb-16 max-w-3xl text-center dark:text-black">
				<Eyebrow>{{ t('Jak działam') }}</Eyebrow>
				<SectionTitle>
					{{ t('Prosty Proces') }}
					<span class="text-custom whitespace-nowrap">{{ t('4 Kroki') }}</span>
				</SectionTitle>
				<SectionDescription>
					{{
						t(
							'Całą drogę do nowej strony internetowej przechodzimy wspólnie, sprawnie i bez zbędnych formalności.',
						)
					}}
				</SectionDescription>
			</div>

			<!-- RWD: 1 kolumna na mobile, 2 na tabletach, 4 na desktopie -->
			<div class="relative grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
				<div
					v-for="(step, index) in items"
					:key="index"
					class="group relative flex w-full flex-col justify-between rounded-2xl border border-slate-100 bg-slate-50 p-6 transition-all duration-300 hover:bg-white hover:shadow-xl sm:p-8"
				>
					<div>
						<div class="mb-6 flex items-center justify-between">
							<div
								class="bg-custom flex h-10 w-10 items-center justify-center rounded text-lg font-bold text-white"
							>
								{{ index + 1 }}.
							</div>
						</div>
						<h3 class="mb-2 text-lg font-bold text-black">{{ t(step.title) }}</h3>
						<p class="text-sm leading-relaxed text-slate-600">
							{{ t(step.description) }}
						</p>
					</div>
				</div>
			</div>

			<!-- Dolne CTA -->
			<div class="mt-12 text-center">
				<a
					href="#kontakt"
					class="inline-flex transform items-center justify-center rounded-3xl border border-transparent bg-black px-6 py-3 text-base font-medium text-white transition-all duration-200 hover:-translate-y-0.5 hover:opacity-90"
				>
					{{ t('Zacznijmy od pierwszego kroku') }}
					<ArrowRight class="text-sm" />
				</a>
			</div>
		</SectionWrapper>
	</section>
</template>
