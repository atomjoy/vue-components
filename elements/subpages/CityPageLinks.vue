<script setup lang="ts">
import { computed } from 'vue'

interface Props {
	cityList: Record<string, string> // Obiekt { slug: nazwa }
	cityName: string
}

const props = defineProps<Props>()

const filteredCities = computed<[string, string][]>(() => {
	return Object.entries(props.cityList).filter(([slug]) => slug !== props.cityName.toLowerCase())
})
</script>

<template>
	<ul class="mt-4 space-y-2 text-sm font-medium">
		<li v-for="[slug, name] in filteredCities">
			<a
				:key="slug"
				:title="name"
				:href="`/strony-internetowe/${slug}`"
				class="hover:text-custom text-sm text-slate-600 underline transition-colors hover:underline"
			>
				{{ name }}
			</a>
		</li>
	</ul>
</template>
