<script setup lang="ts">
import { show } from '@/routes/works'
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
	item: JobOffer
}>()

function employment(name: string) {
	if (name == 'CONTRACTOR') {
		return 'Kontract'
	} else if (name == 'PART_TIME') {
		return 'Czas określony'
	} else if (name == 'TEMPORARY') {
		return 'Tymczasowa'
	} else {
		return 'Nieokreślony'
	}
}
</script>

<template>
	<div class="border-input mb-6 flex w-full border p-4">
		<div class="w-full">
			<h2 class="hover:text-main text-2xl">
				<Link :href="show(item.slug).url" :title="$t(item.name)" class="hover:text-custom">
					{{ $t(item.name) }} ({{ item.address_country }})
				</Link>
			</h2>
			<p class="mt-2 w-full text-neutral-600 dark:text-neutral-300">
				{{ $t(item.description) }}
			</p>
			<div class="mt-4 flex flex-wrap gap-4 text-neutral-500">
				<div class="flex items-center gap-2">
					<Timer /> {{ employment(item.employment) }}
				</div>
				<div class="flex items-center gap-2">
					<HandCoins /> {{ item.salary_min }} - {{ item.salary_max }}
					{{ item.salary_currency }} / {{ $t(item.salary_unit) }}
				</div>
				<div v-if="item.remote === 'TELECOMMUTE'" class="flex items-center gap-2">
					<MapPinHouse /> {{ $t('Zdalnie') }} ({{ $t(item.remote_country) }})
				</div>
			</div>
		</div>
	</div>
</template>
