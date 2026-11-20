<script setup lang="ts">
import { Head } from '@inertiajs/vue3'

interface Props {
	seo?: {
		title?: string
		description?: string
		canonical?: string
	}
}

const props = withDefaults(defineProps<Props>(), {
	seo: () => ({}),
})
</script>

<template>
	<Head :title="props?.seo?.title">
		<meta v-if="seo.description" name="description" :content="seo.description" data-inertia />
		<link
			v-if="props.seo.canonical"
			:href="props.seo.canonical"
			rel="canonical"
			id="canonical"
			data-inertia
		/>
	</Head>
</template>
