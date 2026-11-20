<script setup lang="ts">
import { ref } from 'vue'
import { useForm } from '@inertiajs/vue3'
import { getMarketingParams } from '@/utils/userHelpers'
import { leads } from '@/routes/form'
import { ArrowRight } from '@lucide/vue'
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
	form_type: 'home_contact_form',
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
					form_type: 'home_contact_form',
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
			}, 6000)
		},
	})
}
</script>

<template>
	<div class="border-input mx-auto my-16 max-w-3xl rounded-xl border p-6">
		<div v-if="isSubmitted" class="space-y-3 py-8 text-center">
			<div
				class="inline-flex h-12 w-12 items-center justify-center rounded-full bg-lime-200 text-lime-600"
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
			<h3 class="text-lg font-bold">{{ t('leads_form.thanks.title') }}</h3>
			<p class="text-sm text-gray-500">
				{{ t('leads_form.thanks.message') }}
			</p>
		</div>
		<!-- Główny formularz kontaktowy -->
		<div v-else>
			<h3 class="mb-1 text-lg font-bold">{{ t('leads_form.title') }}</h3>
			<p class="mb-4 text-sm text-gray-500">
				{{ t('leads_form.description') }}
			</p>

			<form @submit.prevent="submitForm" class="form-style space-y-3">
				<div>
					<label class="mb-1 block text-sm font-medium">
						{{ t('leads_form.input.name') }}
					</label>
					<input
						v-model="form.name"
						type="text"
						required
						class="border-input w-full resize-none rounded-lg border px-3 py-3"
						:placeholder="t('leads_form.input.eg') + ' Jan Kowalski'"
					/>
					<div v-if="form.errors.name" class="mt-1 text-sm text-red-500">
						{{ form.errors.name }}
					</div>
				</div>

				<div>
					<label class="mb-1 block text-sm font-medium">
						{{ t('leads_form.input.email') }}
					</label>
					<input
						v-model="form.email"
						type="email"
						required
						class="border-input w-full resize-none rounded-lg border px-3 py-3"
						:placeholder="t('leads_form.input.eg') + ' jan@kowalski.pl'"
					/>
					<div v-if="form.errors.email" class="mt-1 text-sm text-red-500">
						{{ form.errors.email }}
					</div>
				</div>

				<div>
					<label class="mb-1 block text-sm font-medium">
						{{ t('leads_form.input.phone') }}
					</label>
					<input
						v-model="form.phone"
						type="text"
						class="border-input w-full resize-none rounded-lg border px-3 py-3"
						:placeholder="t('leads_form.input.eg') + ' +48 500 600 700'"
					/>
					<div v-if="form.errors.phone" class="mt-1 text-sm text-red-500">
						{{ form.errors.phone }}
					</div>
				</div>

				<div>
					<label class="mb-1 block text-sm font-medium">
						{{ t('leads_form.input.message') }}
					</label>
					<textarea
						v-model="form.message"
						rows="3"
						required
						class="border-input w-full resize-none rounded-lg border px-3 py-3"
						:placeholder="t('leads_form.input.message.info')"
					></textarea>
					<div v-if="form.errors.message" class="mt-1 text-sm text-red-500">
						{{ form.errors.message }}
					</div>
				</div>

				<button
					type="submit"
					:disabled="form.processing"
					class="bg-custom hover:bg-custom-dark mt-2 flex w-full items-center justify-center gap-2 rounded-lg py-3.5 font-semibold transition-colors hover:text-black disabled:opacity-50"
				>
					{{
						form.processing
							? t('leads_form.button.processing')
							: t('leads_form.button.send')
					}}

					<ArrowRight />
				</button>

				<p class="w-full justify-center text-sm">{{ t('leads_form.info') }}</p>
			</form>
		</div>
	</div>
</template>
