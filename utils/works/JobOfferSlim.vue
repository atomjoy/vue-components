<script setup lang="ts">
import { Link } from '@inertiajs/vue3'
import { HandCoins, MapPinHouse, Timer } from '@lucide/vue'

interface JobOffer {
	slug: string
	name: string
	content: string
	address_country: string
	description: string
	employment: string
	salary_min: number | string
	salary_max: number | string
	salary_currency: string
	salary_unit: string
	remote: 'TELECOMMUTE' | string
	remote_country: string
	company_logo?: string
}

defineProps<{
	offer: JobOffer
}>()
</script>

<template>
	<div class="w-full border-b">
		<div class="border-input mb-6 flex border p-4">
			<div class="w-full">
				<h2 class="hover:text-main text-2xl">
					<Link :href="`/kariera/${offer.slug}`" :title="$t(offer.name)">
						{{ $t(offer.name) }} ({{ offer.address_country }})
					</Link>
				</h2>
				<p class="mt-2 w-full text-neutral-600 dark:text-neutral-300">
					{{ $t(offer.description) }}
				</p>
				<div class="mt-4 flex flex-wrap gap-4 text-neutral-500">
					<div class="flex items-center gap-2"><Timer /> {{ $t(offer.employment) }}</div>
					<div class="flex items-center gap-2">
						<HandCoins /> {{ offer.salary_min }} - {{ offer.salary_max }}
						{{ offer.salary_currency }} / {{ $t(offer.salary_unit) }}
					</div>
					<div v-if="offer.remote === 'TELECOMMUTE'" class="flex items-center gap-2">
						<MapPinHouse /> {{ $t('Remote') }} ({{ $t(offer.remote_country) }})
					</div>
				</div>
			</div>
		</div>

		<div class="border-input mb-6 border p-6 whitespace-pre-line">
			{{ offer.content }}
		</div>
	</div>
</template>
