<script setup lang="ts">
import { Megaphone } from '@lucide/vue'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

const props = defineProps<{
	payload: any
}>()
</script>

<template>
	<div class="mb-6 w-full">
		<div class="border-input overflow-hidden rounded-xl border">
			<!-- Nagłówek karty z danymi klienta -->
			<div class="border-input border-b p-6">
				<div class="flex items-start justify-between gap-4">
					<div>
						<h2 class="text-xl font-bold text-gray-900 dark:text-gray-100">
							{{ props.payload.name }}
						</h2>
						<p
							class="mt-2 flex flex-wrap items-center gap-y-1 text-sm font-medium text-gray-500 dark:text-gray-400"
						>
							<!-- Link do wysyłki Email -->
							<a
								:href="`mailto:${props.payload.email}`"
								class="hover:text-custom transition-colors duration-150 focus:underline focus:outline-none dark:hover:text-indigo-400"
								title="Wyślij e-mail"
							>
								{{ props.payload.email }}
							</a>

							<!-- Separator -->
							<span class="mx-3 hidden text-gray-300 sm:inline dark:text-gray-700"
								>|</span
							>

							<!-- Link do Telefonu -->
							<template v-if="props.payload.phone">
								<a
									:href="`tel:${props.payload.phone.replace(/\s+/g, '')}`"
									class="hover:text-custom transition-colors duration-150 focus:underline focus:outline-none dark:hover:text-indigo-400"
									title="Zadzwoń"
								>
									{{ props.payload.phone }}
								</a>
							</template>
							<template v-else>
								<span class="text-gray-400 italic dark:text-gray-600">
									{{ t('No phone') }}
								</span>
							</template>
						</p>
					</div>
					<!-- Akcent z ikoną Megaphone -->
					<div class="text-custom rounded-lg p-2.5">
						<Megaphone class="h-5 w-5" />
					</div>
				</div>
			</div>

			<!-- Sekcja parametrów UTM i metadanych marketingowych -->
			<div class="border-input border-b px-6 py-4">
				<div class="grid grid-cols-1 gap-4 sm:grid-cols-3">
					<!-- UTM Source -->
					<div class="border-input flex flex-col rounded-lg border p-3 dark:bg-zinc-900">
						<span
							class="text-xs font-semibold tracking-wider text-gray-400 uppercase dark:text-gray-500"
						>
							Utm Source
						</span>
						<span
							class="mt-1 text-sm font-medium break-all text-gray-800 dark:text-gray-200"
						>
							{{ props.payload.utm_source || '—' }}
						</span>
					</div>

					<!-- UTM Campaign -->
					<div class="border-input flex flex-col rounded-lg border p-3 dark:bg-zinc-900">
						<span
							class="text-xs font-semibold tracking-wider text-gray-400 uppercase dark:text-gray-500"
						>
							Utm Campaign
						</span>
						<span
							class="mt-1 text-sm font-medium break-all text-gray-800 dark:text-gray-200"
						>
							{{ props.payload.utm_campaign || '—' }}
						</span>
					</div>

					<!-- UTM Medium -->
					<div class="border-input flex flex-col rounded-lg border p-3 dark:bg-zinc-900">
						<span
							class="text-xs font-semibold tracking-wider text-gray-400 uppercase dark:text-gray-500"
						>
							Utm Medium
						</span>
						<span
							class="mt-1 text-sm font-medium break-all text-gray-800 dark:text-gray-200"
						>
							{{ props.payload.utm_medium || '—' }}
						</span>
					</div>
				</div>
			</div>

			<!-- Sekcja z treścią wiadomości -->
			<div class="p-6">
				<span
					class="mb-2 block text-xs font-semibold tracking-wider text-gray-400 uppercase dark:text-gray-500"
				>
					{{ t('Message') }}
				</span>
				<div
					class="border-input rounded-xl border bg-gray-50 p-4 text-sm leading-relaxed font-normal whitespace-pre-line text-gray-700 dark:bg-zinc-800/50 dark:text-gray-300"
				>
					{{ props.payload.message || t('No content') }}
				</div>

				<span
					class="my-2 block text-xs font-semibold tracking-wider text-gray-400 uppercase dark:text-gray-500"
				>
					{{ t('Note') }}
				</span>
				<div
					class="border-input rounded-xl border bg-gray-50 p-4 text-sm leading-relaxed font-normal whitespace-pre-line text-gray-700 dark:bg-zinc-800/50 dark:text-gray-300"
				>
					{{ props.payload.note || t('No content') }}
				</div>
			</div>
		</div>
	</div>
</template>
