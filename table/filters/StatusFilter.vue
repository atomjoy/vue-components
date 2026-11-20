<!--
// How to
const selectedStatus = defineModel<string[]>({ default: () => [] })
<StatusFilter
    v-model="selectedStatus"
    :options="[
        { value: 'superadmin', label: 'Superadmin', count: 1 },
        { value: 'admin', label: 'Admin', count: 69 },
        { value: 'user', label: 'User', count: 9596875 },
    ]"
/>
-->
<script setup lang="ts">
import { computed, ref } from 'vue'
import { Plus, Search, Check } from '@lucide/vue'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'

interface StatusOption {
	value: string
	label: string
	count: number
}

const props = withDefaults(
	defineProps<{
		options: StatusOption[]
		label: string | 'Status'
	}>(),
	{
		label: 'Status',
	},
)

// Dwukierunkowe wiązanie tablicy zaznaczonych ról (v-model)
const selectedStatus = defineModel<string[]>({ default: () => [] })
const searchQuery = ref('')
const isOpen = ref(false)

// Filtrowanie opcji na podstawie wpisanej frazy
const filteredOptions = computed(() => {
	return props.options.filter((option) =>
		option.label.toLowerCase().includes(searchQuery.value.toLowerCase()),
	)
})

// Logika zaznaczania / odznaczania checkboxa
const toggleRole = (value: string) => {
	console.log('StatusFilter', value)
	const index = selectedStatus.value.indexOf(value)
	if (index > -1) {
		selectedStatus.value = selectedStatus.value.filter((role) => role !== value)
	} else {
		selectedStatus.value = [...selectedStatus.value, value]
	}
}

// Czyszczenie wybranych filtrów
const clearFilters = () => {
	selectedStatus.value = []
}
</script>

<template>
	<Popover v-model:open="isOpen">
		<PopoverTrigger as-child>
			<div
				class="border-input bg-background flex h-10 w-full items-center overflow-hidden rounded-md border"
			>
				<Button
					variant="outline"
					size="sm"
					class="h-10 w-full flex-1 cursor-pointer justify-start gap-2 border-0 px-3 shadow-none outline-0"
				>
					<Plus class="h-4 w-4 rounded-4xl bg-black text-white" />
					<span class="font-medium">{{ label }}</span>
				</Button>

				<!-- Licznik wybranych elementów w badge'u -->
				<Separator orientation="vertical" class="h-4" />
				<span class="text-muted-foreground px-4 text-xs font-semibold">
					{{ selectedStatus.length ?? 0 }}
				</span>
			</div>
		</PopoverTrigger>

		<PopoverContent class="w-64 p-0" align="start">
			<!-- Wyszukiwarka wewnątrz popovera -->
			<div class="relative border-b p-2">
				<Search
					class="text-muted-foreground absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2"
				/>
				<Input
					v-model="searchQuery"
					placeholder="Roles"
					class="h-8 border-0 pl-8 text-xs focus-visible:ring-0 focus-visible:ring-offset-0"
				/>
			</div>

			<!-- Lista ról do wyboru -->
			<div class="max-h-60 space-y-0.5 overflow-y-auto p-1">
				<div
					v-for="option in filteredOptions"
					:key="option.value"
					@click.stop="toggleRole(option.value)"
					class="hover:bg-accent hover:text-accent-foreground flex cursor-pointer items-center justify-between rounded-sm px-2 py-1.5 text-sm"
				>
					<div class="flex items-center gap-2">
						<!-- Dedykowany checkbox -->
						<div
							class="border-primary flex h-4 w-4 shrink-0 items-center justify-center rounded-sm border shadow transition-colors"
							:class="
								selectedStatus.includes(option.value)
									? 'bg-primary text-primary-foreground'
									: 'bg-transparent'
							"
						>
							<Check
								v-if="selectedStatus.includes(option.value)"
								class="h-3 w-3 stroke-3"
							/>
						</div>
						<label class="truncate">
							{{ option.label }}
						</label>
					</div>

					<!-- Liczba przypisanych rekordów po prawej stronie -->
					<span class="text-muted-foreground ml-auto text-xs tabular-nums">
						{{ option.count }}
					</span>
				</div>

				<div
					v-if="filteredOptions.length === 0"
					class="text-muted-foreground p-3 text-center text-xs"
				>
					No roles found.
				</div>
			</div>

			<!-- Stopka czyszcząca filtry -->
			<template v-if="selectedStatus.length > 0">
				<Separator />
				<div class="p-1">
					<Button
						variant="ghost"
						class="h-8 w-full justify-center text-xs font-normal"
						@click="clearFilters"
					>
						Clear filters
					</Button>
				</div>
			</template>
		</PopoverContent>
	</Popover>
</template>
