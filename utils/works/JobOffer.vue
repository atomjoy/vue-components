<script setup lang="ts">
import { computed } from 'vue'
import { Link } from '@inertiajs/vue3'
import { Building } from '@lucide/vue'

interface JobOffer {
	name: string
	slug: string
	description: string
	content: string
	employment: string
	address_country: string
	address_region: string
	address_city: string
	address_street: string
	address_code: string
	company_name: string
	company_url: string
	company_logo: string
	remote: string
	remote_country: string
	salary_currency: string
	salary_min: string
	salary_max: string
	salary_unit: string
	published_at: string
	valid_at: string
}

const props = defineProps<{
	offer: JobOffer
}>()

const formattedSalary = computed(() => {
	if (!props.offer.salary_min && !props.offer.salary_max) return 'Undisclosed salary'

	const min = props.offer.salary_min ? parseFloat(props.offer.salary_min).toLocaleString() : ''
	const max = props.offer.salary_max ? parseFloat(props.offer.salary_max).toLocaleString() : ''
	const currency = props.offer.salary_currency.toUpperCase()
	const unit = props.offer.salary_unit ? ` / ${props.offer.salary_unit}` : ''

	if (min && max) return `${min} - ${max} ${currency}${unit}`
	if (min) return `From ${min} ${currency}${unit}`
	return `Up to ${max} ${currency}${unit}`
})

const location = computed(() => {
	const parts = [props.offer.address_city, props.offer.address_country].filter(Boolean)
	return parts.join(', ') || 'Remote / Global'
})

const formattedDate = computed(() => {
	if (!props.offer.published_at) return ''
	return new Date(props.offer.published_at).toLocaleDateString('pl-PL', {
		day: 'numeric',
		month: 'short',
		year: 'numeric',
	})
})
</script>

<template>
	<div
		class="border-input hover:border-custom flex flex-col justify-between gap-4 border p-6 transition-colors duration-200 md:flex-row md:items-start"
	>
		<div class="flex items-start gap-4">
			<div
				v-if="props.offer.company_logo"
				class="flex h-12 w-12 shrink-0 items-center justify-center border border-neutral-100 bg-neutral-50 p-1"
			>
				<img
					:src="props.offer.company_logo"
					alt=""
					class="max-h-full max-w-full object-contain"
				/>
			</div>
			<div v-else class="h-12 w-12 border border-neutral-200 text-xs">
				<Building />
			</div>

			<div>
				<div class="mb-1 flex flex-wrap items-center gap-2">
					<a
						v-if="props.offer.company_url"
						:href="props.offer.company_url"
						target="_blank"
						rel="noopener noreferrer"
						class="text-sm font-medium text-neutral-600 underline underline-offset-4 hover:text-neutral-900"
					>
						{{ props.offer.company_name }}
					</a>
					<span v-else class="text-sm font-medium text-neutral-600">
						{{ props.offer.company_name }}
					</span>

					<span
						v-if="props.offer.remote && props.offer.remote !== 'none'"
						class="inline-block bg-neutral-100 px-2 py-0.5 text-[11px] font-semibold tracking-wider text-neutral-800 uppercase"
					>
						{{ props.offer.remote }}
					</span>
				</div>

				<h3 class="mb-2 text-lg font-semibold text-neutral-900">
					<Link
						:href="`/kariera/${props.offer.slug}`"
						class="hover:text-neutral-600"
						target="_blank"
					>
						{{ props.offer.name }}
					</Link>
				</h3>

				<p class="mb-3 line-clamp-2 max-w-2xl text-sm text-neutral-500">
					{{ props.offer.description }}
				</p>

				<!-- <p class="mb-3 max-w-2xl text-sm text-neutral-500">
					{{ props.offer.content }}
				</p> -->

				<div class="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-neutral-400">
					<span class="flex items-center gap-1">
						<span class="h-1.5 w-1.5 rounded-full bg-neutral-300"></span>
						{{ props.offer.employment }}
					</span>
					<span class="flex items-center gap-1">
						<span class="h-1.5 w-1.5 rounded-full bg-neutral-300"></span>
						{{ location }}
					</span>
				</div>
			</div>
		</div>

		<div
			class="flex shrink-0 flex-col items-start justify-between gap-2 self-stretch md:items-end md:text-right"
		>
			<div class="text-base font-medium text-neutral-900">
				{{ formattedSalary }}
			</div>
			<div v-if="formattedDate" class="mt-auto text-xs text-neutral-400">
				{{ formattedDate }}
			</div>
		</div>
	</div>

	<div class="border-input mb-6 border p-6 whitespace-pre-line">
		{{ offer.content }}
	</div>
</template>
