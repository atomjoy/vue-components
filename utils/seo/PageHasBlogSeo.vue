<script setup lang="ts">
import { Head } from '@inertiajs/vue3'

interface MetaTag {
	name?: string
	property?: string
	content: string
	'head-key': string
}

interface Props {
	seo?: {
		title?: string
		description?: string
		canonical?: string
		metatags?: MetaTag[]
	}
}

const props = withDefaults(defineProps<Props>(), {
	seo: () => ({}),
})
</script>

<template>
	<Head :title="props.seo.title">
		<link rel="canonical" :href="props.seo.canonical" id="canonical" head-key="canonical" />
		<meta v-for="(tag, index) in props.seo.metatags" :key="index" v-bind="tag" />
	</Head>
</template>
