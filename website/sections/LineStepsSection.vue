<script setup lang="ts">
import { ArrowRight } from '@lucide/vue'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

defineProps<{
	items: any[]
}>()
</script>
<template>
	<section class="bg-white px-4 py-16 font-sans sm:px-6 lg:px-8 lg:py-24">
		<div class="mx-auto max-w-7xl">
			<div class="mx-auto mb-16 max-w-3xl text-center lg:mb-20">
				<span class="text-custom text-sm font-semibold tracking-wider uppercase">
					{{ t('Jak działamy?') }}
				</span>
				<h2 class="mt-2 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
					{{ t('Prosty i przejrzysty proces') }}
					<span class="text-custom">{{ t('współpracy') }}</span>
				</h2>
				<p class="mt-4 text-lg text-slate-600">
					{{
						t(
							'Przeprowadzimy Cię przez cały proces tworzenia strony internetowej – bez stresu, bez skomplikowanego technicznego żargonu.',
						)
					}}
				</p>
			</div>

			<div class="relative">
				<div
					class="absolute top-0 left-4 h-full w-0.5 transform bg-slate-200 lg:left-1/2 lg:-translate-x-1/2"
				></div>

				<div class="space-y-12 lg:space-y-20">
					<div
						v-for="(step, index) in items"
						:key="index"
						class="relative flex flex-col items-center lg:flex-row"
						:class="{ 'lg:flex-row-reverse': index % 2 !== 0 }"
					>
						<div
							class="flex w-full pr-0 pl-10 lg:w-1/2 lg:px-12"
							:class="index % 2 !== 0 ? 'lg:justify-start' : 'lg:justify-end'"
						>
							<div
								class="group relative w-full rounded-2xl border border-slate-100 bg-slate-50 p-6 transition-shadow duration-300 hover:bg-white hover:shadow-xl sm:p-8 lg:max-w-md"
							>
								<span
									class="text-custom mb-2 inline-block text-xs font-bold tracking-wider uppercase lg:hidden"
								>
									{{ t('Krok') }} {{ index + 1 }}
								</span>
								<h3 class="mb-3 text-xl font-bold text-slate-900">
									{{ t(step.title) }}
								</h3>
								<p class="text-sm leading-relaxed text-slate-600">
									{{ t(step.description) }}
								</p>
							</div>
						</div>

						<div
							class="absolute top-6 left-2 z-10 flex transform items-center justify-center lg:top-1/2 lg:left-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2"
						>
							<div
								class="bg-custom shadow-custom/20 flex h-5 w-5 items-center justify-center rounded-full border-4 border-white text-xs font-bold text-white shadow-lg lg:h-12 lg:w-12 lg:text-base"
							>
								<span class="hidden lg:block">{{ index + 1 }}</span>
							</div>
						</div>

						<div class="hidden w-full lg:block lg:w-1/2"></div>
					</div>
				</div>
			</div>

			<!-- Dolne CTA -->
			<div class="mt-16 text-center">
				<a
					href="#kontakt"
					class="bg-custom shadow-custom/20 inline-flex transform items-center justify-center rounded-xl border border-transparent px-6 py-3 text-base font-medium text-white shadow-lg transition-all duration-200 hover:-translate-y-0.5 hover:opacity-90"
				>
					{{ t('Zacznijmy od pierwszego kroku') }}
					<ArrowRight class="text-sm" />
				</a>
			</div>
		</div>
	</section>
</template>
