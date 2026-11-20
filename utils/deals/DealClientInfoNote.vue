<script setup lang="ts">
import { Handshake, Link as LinkIcon, FileText } from '@lucide/vue'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

const props = defineProps<{
	payload: any
}>()
</script>

<template>
	<div class="mb-6 w-full">
		<div class="border-input bg-background overflow-hidden rounded-xl border">
			<!-- Nagłówek karty z Tytułem Transakcji -->
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

						<!-- Powiązany Lead (Dane kontaktowe z relacji) -->
						<p
							class="mt-3 flex flex-wrap items-center gap-y-1 text-sm font-medium text-gray-500 dark:text-gray-400"
						>
							<template v-if="props.payload.lead">
								<span
									class="mr-2 rounded bg-zinc-100 px-2 py-0.5 font-mono text-xs text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400"
								>
									Lead #{{ props.payload.lead.id }}
								</span>

								<!-- Link Email z relacji Leada -->
								<a
									:href="`mailto:${props.payload.lead.email}`"
									class="hover:text-custom transition-colors duration-150 focus:underline focus:outline-none dark:hover:text-indigo-400"
								>
									{{ props.payload.lead.email }}
								</a>

								<span
									v-if="props.payload.lead.phone"
									class="mx-3 text-gray-300 dark:text-gray-700"
									>|</span
								>

								<!-- Link Telefon z relacji Leada -->
								<a
									v-if="props.payload.lead.phone"
									:href="`tel:${props.payload.lead.phone.replace(/\s+/g, '')}`"
									class="hover:text-custom transition-colors duration-150 focus:underline focus:outline-none dark:hover:text-indigo-400"
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
					<div class="text-custom rounded-lg border bg-zinc-50 p-2.5 dark:bg-zinc-900">
						<Handshake class="h-5 w-5" />
					</div>
				</div>
			</div>

			<!-- Główna Notatka Handlowa dla tego Deala -->
			<div class="border-input border-b p-6">
				<span
					class="mb-2 flex items-center gap-1.5 text-xs font-semibold tracking-wider text-gray-400 uppercase dark:text-gray-500"
				>
					<FileText class="h-3.5 w-3.5" /> {{ t('Deal Note / Internal Arrangements') }}
				</span>
				<div
					class="border-input bg-background rounded-xl border p-4 text-sm leading-relaxed font-normal whitespace-pre-line text-gray-700 dark:text-gray-300"
				>
					{{ props.payload.note || t('No specific note added for this deal yet.') }}
				</div>
			</div>

			<!-- Sekcja Marketingowa (Wyciągana przez relację leada, jeśli istnieje) -->
			<div
				v-if="
					props.payload.lead &&
					(props.payload.lead.utm_source ||
						props.payload.lead.utm_campaign ||
						props.payload.lead.utm_medium)
				"
				class="border-input bg-muted/20 border-b px-6 py-4"
			>
				<div
					class="text-muted-foreground mb-3 flex items-center gap-1.5 text-xs font-semibold"
				>
					<LinkIcon class="h-3 w-3" /> {{ t('Acquisition Campaign Source (Lead)') }}
				</div>
				<div class="grid grid-cols-1 gap-4 sm:grid-cols-3">
					<div class="border-input bg-background flex flex-col rounded-lg border p-2.5">
						<span
							class="text-[10px] font-semibold tracking-wider text-gray-400 uppercase"
							>Utm Source</span
						>
						<span
							class="mt-0.5 text-xs font-medium break-all text-gray-800 dark:text-gray-200"
						>
							{{ props.payload.lead.utm_source || '—' }}
						</span>
					</div>

					<div class="border-input bg-background flex flex-col rounded-lg border p-2.5">
						<span
							class="text-[10px] font-semibold tracking-wider text-gray-400 uppercase"
							>Utm Campaign</span
						>
						<span
							class="mt-0.5 text-xs font-medium break-all text-gray-800 dark:text-gray-200"
						>
							{{ props.payload.lead.utm_campaign || '—' }}
						</span>
					</div>

					<div class="border-input bg-background flex flex-col rounded-lg border p-2.5">
						<span
							class="text-[10px] font-semibold tracking-wider text-gray-400 uppercase"
							>Utm Medium</span
						>
						<span
							class="mt-0.5 text-xs font-medium break-all text-gray-800 dark:text-gray-200"
						>
							{{ props.payload.lead.utm_medium || '—' }}
						</span>
					</div>
				</div>
			</div>

			<!-- Pierwotne wiadomości i notatki z pierwotnego zgłoszenia lead -->
			<div v-if="props.payload.lead" class="grid grid-cols-1 gap-4 p-6 sm:grid-cols-2">
				<div>
					<span
						class="mb-2 block text-xs font-semibold tracking-wider text-gray-400 uppercase"
					>
						{{ t('Original Lead Message') }}
					</span>
					<div
						class="border-input rounded-xl border bg-gray-50/50 p-4 text-xs leading-relaxed whitespace-pre-line text-gray-600 dark:bg-zinc-800/30 dark:text-gray-400"
					>
						{{ props.payload.lead.message || t('No content') }}
					</div>
				</div>
				<div>
					<span
						class="mb-2 block text-xs font-semibold tracking-wider text-gray-400 uppercase"
					>
						{{ t('Original Lead Note') }}
					</span>
					<div
						class="border-input rounded-xl border bg-gray-50/50 p-4 text-xs leading-relaxed whitespace-pre-line text-gray-600 dark:bg-zinc-800/30 dark:text-gray-400"
					>
						{{ props.payload.lead.note || t('No content') }}
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
