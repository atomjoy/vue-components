<script setup lang="ts">
import { computed } from 'vue'
import { Link } from '@inertiajs/vue3'
import { ChevronLeft, ChevronRight } from '@lucide/vue'

const props = withDefaults(
	defineProps<{
		data: any | null
	}>(),
	{
		data: null,
	},
)

const items = computed(() => props.data.data)
</script>

<template>
	<div v-if="items.length == 0" class="float-left mt-4 mb-8 w-full border p-4">
		{{ $t('Brak danych') }}
	</div>

	<Link
		:href="data.prev_page_url"
		v-if="data.prev_page_url != null"
		:title="$t('Poprzednia strona')"
	>
		<div class="page-prev float-left mr-4 mb-6 inline rounded border px-5 py-3">
			<ChevronLeft />
		</div>
	</Link>

	<div
		v-if="data.total > 0"
		class="page-prev float-left mr-4 mb-6 inline rounded border px-5 py-3"
	>
		{{ data.current_page }} / {{ data.last_page }}
	</div>

	<Link
		:href="data.next_page_url"
		v-if="data.next_page_url != null"
		:title="$t('Następna strona')"
	>
		<div class="page-next float-right mb-6 inline rounded border px-5 py-3">
			<ChevronRight />
		</div>
	</Link>
</template>
