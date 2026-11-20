<script setup lang="ts">
import { Handshake, Link as LinkIcon, FileText, Info } from '@lucide/vue'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

const props = defineProps<{
	payload: any
}>()
</script>

<template>
	<div class="mb-6 w-full">
		<div class="border-input bg-background overflow-hidden rounded-xl border">
			<!-- 1. NAGŁÓWEK KARTY: Tytuł Transakcji & Kontakt -->
			<div class="border-input border-b p-6">
				<div class="flex items-start justify-between gap-4">
					<div>
						<span
							class="text-muted-foreground text-xs font-semibold tracking-wider uppercase"
						>
							{{ t('Deal Title') }}
						</span>
						<h2 class="mt-0.5 text-xl font-bold text-gray-900 dark:text-gray-100">
							{{ props.payload.title }}
						</h2>

						<!-- Dane kontaktowe pobierane przez relację leada -->
						<p
							class="mt-3 flex flex-wrap items-center gap-y-1 text-sm font-medium text-gray-500 dark:text-gray-400"
						>
							<template v-if="props.payload.lead">
								<span
									class="mr-2 rounded bg-zinc-100 px-2 py-0.5 font-mono text-xs text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400"
								>
									Lead #{{ props.payload.lead.id }}
								</span>

								<a
									:href="`mailto:${props.payload.lead.email}`"
									class="hover:text-custom dark:hover:text-custom-400 transition-colors duration-150 focus:underline focus:outline-none"
								>
									{{ props.payload.lead.email }}
								</a>

								<span
									v-if="props.payload.lead.phone"
									class="mx-3 text-gray-300 dark:text-gray-700"
									>|</span
								>

								<a
									v-if="props.payload.lead.phone"
									:href="`tel:${props.payload.lead.phone.replace(/\s+/g, '')}`"
									class="hover:text-custom dark:hover:text-custom-400 transition-colors duration-150 focus:underline focus:outline-none"
								>
									{{ props.payload.lead.phone }}
								</a>
							</template>
							<template v-else>
								<span class="text-xs text-gray-400 italic dark:text-gray-600">
									{{ t('Direct deal without source lead') }}
								</span>
							</template>
						</p>
					</div>
					<!-- Ikona B2B / Transakcja -->
					<div class="text-custom rounded-lg p-2.5">
						<Handshake class="h-5 w-5" />
					</div>
				</div>
			</div>

			<!-- 2. GŁÓWNA SEKCJA: Aktualna Notatka Handlowa (To jest najważniejsze na etapie Deala) -->
			<div class="p-6">
				<span
					class="mb-2 flex items-center gap-1.5 text-xs font-semibold tracking-wider text-gray-900 uppercase dark:text-gray-100"
				>
					<FileText class="text-primary h-3.5 w-3.5" />
					{{ t('Deal Note / Current Arrangements') }}
				</span>
				<div
					class="border-input rounded-xl border p-4 text-sm leading-relaxed font-normal whitespace-pre-line text-gray-700 dark:text-gray-300"
				>
					{{ props.payload.note || t('No specific notes added for this deal yet.') }}
				</div>
			</div>

			<!-- 3. DOSTĘPNY, ALE STŁUMIONY WIZUALNIE KONTEKST ŹRÓDŁOWY (Dane z pierwotnego leada) -->
			<div
				v-if="props.payload.lead"
				class="space-y-4 border-t bg-gray-50/40 px-6 py-4 dark:bg-zinc-900/10"
			>
				<div
					class="text-muted-foreground flex items-center gap-1.5 text-xs font-medium opacity-70"
				>
					<Info class="h-3.5 w-3.5" /> {{ t('Original Lead Context') }}
				</div>

				<!-- Wiadomości pierwotne -->
				<div class="grid grid-cols-1 gap-4 text-xs sm:grid-cols-2">
					<div>
						<span class="mb-1 block font-medium text-gray-400"
							>{{ t('Original Message') }}:</span
						>
						<p
							class="line-clamp-3 text-gray-600 italic transition-all duration-200 hover:line-clamp-none dark:text-gray-400"
						>
							{{ props.payload.lead.message || '—' }}
						</p>
					</div>
					<div>
						<span class="mb-1 block font-medium text-gray-400"
							>{{ t('Original Initial Note') }}:</span
						>
						<p
							class="line-clamp-3 text-gray-600 italic transition-all duration-200 hover:line-clamp-none dark:text-gray-400"
						>
							{{ props.payload.lead.note || '—' }}
						</p>
					</div>
				</div>

				<!-- Ultra-kompaktowy pasek marketingowy UTM -->
				<div
					v-if="
						props.payload.lead.utm_source ||
						props.payload.lead.utm_campaign ||
						props.payload.lead.utm_medium
					"
					class="text-muted-foreground flex flex-wrap gap-x-6 gap-y-1 border-t border-dashed pt-2 font-mono text-[11px]"
				>
					<div>
						<span class="font-sans font-medium text-gray-400">Source:</span>
						{{ props.payload.lead.utm_source || '—' }}
					</div>
					<div>
						<span class="font-sans font-medium text-gray-400">Campaign:</span>
						{{ props.payload.lead.utm_campaign || '—' }}
					</div>
					<div>
						<span class="font-sans font-medium text-gray-400">Medium:</span>
						{{ props.payload.lead.utm_medium || '—' }}
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
