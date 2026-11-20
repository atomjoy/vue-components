<script setup lang="ts">
import { Link } from '@inertiajs/vue3'
import { ChevronLeft, ChevronRight } from '@lucide/vue'

const props = withDefaults(
	defineProps<{
		name: string
		prev: any | null
		next: any | null
	}>(),
	{
		name: 'item',
		prev: null,
		next: null,
	},
)
</script>

<template>
	<Link :href="'/' + name + '/' + prev.slug" v-if="prev" :title="$t(prev.name)">
		<div class="page-prev float-left mr-4 mb-6 inline rounded border px-5 py-3">
			<ChevronLeft />
		</div>
	</Link>

	<Link :href="'/' + name + '/' + next.slug" v-if="next" :title="$t(next.name)">
		<div class="page-next float-right mb-6 inline rounded border px-5 py-3">
			<ChevronRight />
		</div>
	</Link>
</template>
