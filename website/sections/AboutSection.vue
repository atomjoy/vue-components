<script setup lang="ts">
import SectionWrapper from '@/components/atoms/SectionWrapper.vue'
import { ArrowRight } from '@lucide/vue'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

defineProps<{
	stats: any[]
	features: any[]
	cityName: string | null
}>()
</script>

<template>
	<section id="about" class="bg-slate-50">
		<SectionWrapper>
			<div class="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">
				<div>
					<span class="text-custom text-sm font-semibold tracking-wider uppercase">
						{{ t('Poznaj mnie bliżej') }}
					</span>
					<h2
						class="mt-2 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl"
					>
						{{ t('Nowoczesne strony WWW dla firm') }}
						<span> — </span>
						<span class="text-custom"> {{ cityName ?? 'Przasnysz' }} </span>
					</h2>
					<p class="mt-6 text-lg leading-relaxed text-slate-600">
						{{
							t(
								// 'Od lat łączymy nowoczesny design z zaawansowaną technologią, dostarczając witryny i sklepy online, które zarabiają, przyciągają klientów i budują silną markę.',
								'Oferuję stabilne rozwiązania online, które pomagają pozyskiwać nowych klientów z wyszukiwarki. Zamów stronę internetową zoptymalizowaną pod kątem szybkości działania i SEO.',
							)
						}}
					</p>
					<p class="mt-4 text-base leading-relaxed text-slate-500">
						{{
							t(
								'Każdy projekt traktuję indywidualnie. Dbam o to, aby Twoja nowa strona była nie tylko piękna, ale przede wszystkim szybka, bezpieczna i zoptymalizowana pod kątem wyszukiwarki Google (SEO).',
							)
						}}
					</p>

					<!-- Przycisk CTA -->
					<div class="mt-8">
						<a
							href="#kontakt"
							class="bg-custom hover:bg-custom-dark inline-flex transform items-center justify-center rounded-3xl border border-transparent px-6 py-3 text-base font-medium text-white transition-all duration-200 hover:-translate-y-0.5"
						>
							{{ t('Bezpłatna wycena') }}
							<ArrowRight class="text-sm" />
						</a>
					</div>
				</div>

				<div class="space-y-8">
					<div class="grid grid-cols-2 gap-6">
						<div
							v-for="(stat, index) in stats"
							:key="index"
							class="rounded-2xl bg-white p-6 text-center"
						>
							<dd class="text-3xl font-bold text-black sm:text-4xl">
								{{ stat.value }}
							</dd>
							<dt class="mt-2 text-sm tracking-wide text-black uppercase">
								{{ t(stat.label) }}
							</dt>
						</div>
					</div>

					<div class="space-y-6 rounded-2xl border border-slate-100 bg-white p-8">
						<h3 class="text-lg font-bold text-slate-900">
							{{ t('Co mnie wyróżnia?') }}
						</h3>
						<ul class="space-y-4">
							<li
								v-for="(feature, index) in features"
								:key="index"
								class="flex items-start"
							>
								<div class="mt-1 shrink-0">
									<!-- Ikona -->
									<div
										class="bg-custom/20 text-custom flex h-6 w-6 items-center justify-center rounded-full"
									>
										<svg
											class="h-4 w-4"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24"
										>
											<path
												stroke-linecap="round"
												stroke-linejoin="round"
												stroke-width="2"
												d="M5 13l4 4L19 7"
											></path>
										</svg>
									</div>
								</div>
								<div class="ml-3">
									<h4 class="text-sm font-semibold text-slate-900">
										{{ t(feature.title) }}
									</h4>
									<p class="mt-0.5 text-sm text-slate-500">
										{{ t(feature.description) }}
									</p>
								</div>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</SectionWrapper>
	</section>
</template>
