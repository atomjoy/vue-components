<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search, SlidersHorizontal, Trash2 } from '@lucide/vue'
import { useHasVModel } from '@/composables/table/useHasVModel'
import RolesFilter from '@/components/table/filters/RolesFilter.vue'
import { ref } from 'vue'

defineProps<{
	payload: {
		from: number
		to: number
		total: number
	}
	selectedCount: number
}>()

// Akcje masowe
const emit = defineEmits<{
	(e: 'bulkDelete'): void
}>()

// Locales
const { t } = useI18n()

// Has v-model enable/disable filter
const hasDateVModel = useHasVModel('dateFrom') && useHasVModel('dateTo')
const hasRolesVModel = useHasVModel('selectedRoles') && useHasVModel('rolesList')
const hasFilterVerifiedVModel = useHasVModel('filterVerified')
const hasTwoFactorVModel = useHasVModel('twoFactor')

// Twoway binding przez v-model
const searchQuery = defineModel<string>('search', { default: '' })
const filterVerified = defineModel<string | boolean>('filterVerified', { default: 'all' })
const filter2FA = defineModel<string | boolean>('twoFactor', { default: 'all' })
const perPage = defineModel<number>('perPage', { default: 10 })
const dateFrom = defineModel<string>('dateFrom', { default: '' })
const dateTo = defineModel<string>('dateTo', { default: '' })
const selectedRoles = defineModel<any[]>('selectedRoles', { default: () => [] })
const rolesList = defineModel<any[]>('rolesList', { default: () => [] })

if (perPage.value > 100) {
	perPage.value = 100
}

const isopen = ref(false)

function toggleFilters() {
	isopen.value = !isopen.value
}
</script>

<template>
	<!-- Główna karta z filtrami i nagłówkiem -->
	<div class="w-full pb-4">
		<div class="flex w-full">
			<div class="w-full">
				<h3 class="mb-1 leading-none font-semibold">{{ t('Filter') }}</h3>
				<p class="text-muted-foreground text-sm">
					{{ t('You are displaying') }} {{ payload.from }}-{{ payload.to }}
					{{ t('from') }} {{ payload.total }} {{ t('items') }}.
				</p>
			</div>
			<div class="ml-3 w-auto cursor-pointer">
				<SlidersHorizontal @click="toggleFilters" />
			</div>
		</div>

		<!-- Kontener standardowych filtrów oparty na flex -->
		<div v-if="isopen" class="flex flex-wrap gap-3 pt-4">
			<!-- Wyszukiwarka -->
			<div class="relative w-full sm:w-[calc(50%-6px)] lg:w-[calc(25%-9px)]">
				<Search
					class="text-muted-foreground pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2"
				/>
				<Input
					v-model="searchQuery"
					type="text"
					:placeholder="t('Search by name or email')"
					class="focus-visible:border-input h-10 px-3 py-2 pl-9 text-sm shadow-none focus-visible:ring-0 focus-visible:ring-offset-0"
				/>
			</div>

			<!-- Select Weryfikacja -->
			<select
				v-if="hasFilterVerifiedVModel"
				v-model="filterVerified"
				class="border-input bg-background text-foreground h-10 w-full rounded-md border px-3 py-2 text-sm sm:w-[calc(50%-6px)] lg:w-[calc(25%-9px)]"
			>
				<option value="all">{{ t('Verification: All') }}</option>
				<option value="verified">{{ t('Verified') }}</option>
				<option value="unverified">{{ t('Unverified') }}</option>
			</select>

			<!-- Select 2FA -->
			<select
				v-if="hasTwoFactorVModel"
				v-model="filter2FA"
				class="border-input bg-background text-foreground h-10 w-full rounded-md border px-3 py-2 text-sm sm:w-[calc(50%-6px)] lg:w-[calc(25%-9px)]"
			>
				<option value="all">{{ t('2fa status: All') }}</option>
				<option value="enabled">{{ t('2FA: Enabled') }}</option>
				<option value="disabled">{{ t('2FA: Disabled') }}</option>
			</select>

			<!-- Status filter opakowany w Div (Wymusza rozciąganie komponentu) -->
			<div
				v-if="hasRolesVModel"
				class="flex w-full gap-2 sm:w-[calc(50%-6px)] lg:w-[calc(25%-9px)]"
			>
				<RolesFilter
					v-model="selectedRoles"
					:options="rolesList"
					:label="t('Roles')"
					class="h-9 w-full border-0 focus:outline-none"
				/>
			</div>

			<!-- Filtry Daty (Od - Do) -->
			<div
				v-if="hasDateVModel"
				class="flex w-full gap-2 sm:w-[calc(50%-6px)] lg:w-[calc(25%-9px)]"
			>
				<Input
					v-model="dateFrom"
					type="date"
					class="border-input bg-background text-foreground h-10 w-full text-sm shadow-none focus-visible:ring-0 focus-visible:ring-offset-0"
				/>
				<Input
					v-model="dateTo"
					type="date"
					class="border-input bg-background text-foreground h-10 w-full text-sm shadow-none focus-visible:ring-0 focus-visible:ring-offset-0"
				/>
			</div>

			<!-- Dodatkowe filtry (extra) -->
			<slot name="extra" />
		</div>

		<!-- Dodatkowe filtry (extra) -->
		<!-- <div class="grid grid-cols-2 gap-3 pt-4 md:flex md:flex-wrap md:items-center">
			<slot name="extra" />
		</div> -->

		<!-- Nowa linia pod spodem dla PerPage -->
		<div class="mt-3 flex justify-end">
			<select
				v-model="perPage"
				class="border-input bg-background text-foreground h-10 w-full min-w-32 rounded-md border px-3 py-2 text-sm sm:w-auto"
			>
				<option value="5">{{ t('Show:') }} 5</option>
				<option value="10">{{ t('Show:') }} 10</option>
				<option value="25">{{ t('Show:') }} 25</option>
				<option value="50">{{ t('Show:') }} 50</option>
				<option value="100">{{ t('Show:') }} 100</option>
			</select>
		</div>

		<!-- Pasek akcji masowych -->
		<div
			v-if="selectedCount > 0"
			class="mt-4 flex items-center justify-between rounded-lg border border-dashed border-red-100 bg-red-50/50 p-4"
		>
			<span class="text-sm font-medium">
				{{ t('Selected users:') }}
				<span class="text-primary font-bold">{{ selectedCount }}</span>
			</span>
			<Button variant="destructive" size="sm" class="gap-2" @click="emit('bulkDelete')">
				<Trash2 class="h-4 w-4" /> {{ t('Delete selected') }}
			</Button>
		</div>

		<!-- Filters default slot -->
		<slot />
	</div>
</template>
