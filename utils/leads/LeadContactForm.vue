<script setup lang="ts">
import { ref } from 'vue'
import { useForm } from '@inertiajs/vue3'
import { getMarketingParams } from '@/utils/userHelpers'
import { leads } from '@/routes/form'
import { Send } from '@lucide/vue'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

const isOpen = ref(false)
const isSubmitted = ref(false)
const marketingParams = getMarketingParams()

// Konfigurator
const selectedOptions = ref({
	services: false,
	gallery: false,
	contact: false,
	faqs: false,
})

const form = useForm({
	name: '',
	email: '',
	phone: '',
	message: '',
	meta_data: {},
	form_type: 'floating_lead_form',
	url: typeof window !== 'undefined' ? window.location.href : '',
})

const submitForm = () => {
	form.meta_data = selectedOptions.value

	form.post(leads().url, {
		preserveScroll: true,
		preserveState: true,
		onSuccess: () => {
			isSubmitted.value = true

			// Event (GTM)
			if (typeof window !== 'undefined') {
				;(window as any).dataLayer = (window as any).dataLayer || []
				;(window as any).dataLayer.push({
					event: 'form_submission_success',
					form_type: 'floating_lead_form',
					lead_source: marketingParams.utm_source,
					lead_campaign: marketingParams.utm_campaign,
					lead_medium: marketingParams.utm_medium,
					lead_url: window.location.href,
					lead_title: document.title,
				})
			}

			form.reset()

			setTimeout(() => {
				isOpen.value = false
				isSubmitted.value = false
			}, 3000)
		},
	})
}
</script>

<template>
	<button
		@click="isOpen = !isOpen"
		class="fixed right-6 bottom-6 z-50 flex h-14 w-14 transform items-center justify-center rounded-full bg-blue-600 text-white shadow-lg transition-all duration-300 hover:scale-105 hover:bg-blue-700 hover:shadow-xl focus:outline-none active:scale-95"
	>
		<Send :class="{ 'rotate-45': isOpen }" />
	</button>
	<Transition
		enter-active-class="transition duration-300 ease-out"
		enter-from-class="transform scale-95 opacity-0 translate-y-10"
		enter-to-class="transform scale-100 opacity-100 translate-y-0"
		leave-active-class="transition duration-200 ease-in"
		leave-from-class="transform scale-100 opacity-100 translate-y-0"
		leave-to-class="transform scale-95 opacity-0 translate-y-10"
	>
		<div
			v-if="isOpen"
			class="fixed right-6 bottom-24 z-50 w-80 rounded-2xl border border-gray-100 bg-white p-6 text-gray-800 shadow-2xl md:w-96"
		>
			<div v-if="isSubmitted" class="space-y-3 py-8 text-center">
				<div
					class="inline-flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-600"
				>
					<svg
						xmlns="http://w3.org"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="2.5"
						stroke="currentColor"
						class="h-6 w-6"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="m4.5 12.75 6 6 9-13.5"
						/>
					</svg>
				</div>
				<h3 class="text-lg font-bold text-gray-900">{{ t('leads_form.thanks.title') }}</h3>
				<p class="text-sm text-gray-500">
					{{ t('leads_form.thanks.message') }}
				</p>
			</div>

			<!-- Główny formularz kontaktowy -->
			<div v-else>
				<h3 class="mb-1 text-lg font-bold text-gray-900">{{ t('leads_form.title') }}</h3>
				<p class="mb-4 text-xs text-gray-500">
					{{ t('leads_form.description') }}
				</p>

				<form @submit.prevent="submitForm" class="space-y-3">
					<div>
						<label class="mb-1 block text-xs font-medium text-gray-600">
							{{ t('leads_form.input.name') }}
						</label>
						<input
							v-model="form.name"
							type="text"
							required
							class="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
							:placeholder="t('leads_form.input.eg') + ' Jan Kowalski'"
						/>
						<!-- Błędy walidacji spięte bezpośrednio z Larawela -->
						<div v-if="form.errors.name" class="mt-1 text-xs text-red-500">
							{{ form.errors.name }}
						</div>
					</div>

					<div>
						<label class="mb-1 block text-xs font-medium text-gray-600">
							{{ t('leads_form.input.email') }}
						</label>
						<input
							v-model="form.email"
							type="email"
							required
							class="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
							:placeholder="t('leads_form.input.eg') + ' jan@kowalski.pl'"
						/>
						<div v-if="form.errors.email" class="mt-1 text-xs text-red-500">
							{{ form.errors.email }}
						</div>
					</div>

					<div>
						<label class="mb-1 block text-xs font-medium text-gray-600">
							{{ t('leads_form.input.phone') }}
						</label>
						<input
							v-model="form.phone"
							type="text"
							class="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
							:placeholder="t('leads_form.input.eg') + ' +48 500 600 700'"
						/>
						<div v-if="form.errors.phone" class="mt-1 text-xs text-red-500">
							{{ form.errors.phone }}
						</div>
					</div>

					<div>
						<label class="mb-1 block text-xs font-medium text-gray-600">
							{{ t('leads_form.input.message') }}
						</label>
						<textarea
							v-model="form.message"
							rows="3"
							required
							class="w-full resize-none rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
							:placeholder="t('leads_form.input.message.info')"
						></textarea>
						<div v-if="form.errors.message" class="mt-1 text-xs text-red-500">
							{{ form.errors.message }}
						</div>
					</div>

					<button
						type="submit"
						:disabled="form.processing"
						class="mt-2 w-full rounded-lg bg-blue-600 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-700 disabled:opacity-50"
					>
						{{
							form.processing
								? t('leads_form.button.processing')
								: t('leads_form.button.send')
						}}
					</button>
				</form>
			</div>
		</div>
	</Transition>
</template>
