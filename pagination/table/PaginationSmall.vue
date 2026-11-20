<script setup lang="ts">
import { Link } from '@inertiajs/vue3'

interface PaginationLink {
	url: string | null
	label: string
	active: boolean
}

const props = defineProps<{
	links: PaginationLink[]
}>()
</script>

<template>
	<div v-if="props.links && props.links.length > 3" class="my-8 flex justify-center">
		<nav
			class="inline-flex flex-row items-center space-x-1 rounded-xl bg-transparent p-1.5"
			aria-label="Pagination"
		>
			<template v-for="(link, index) in props.links" :key="index">
				<Link
					v-if="index === 0"
					:href="link.url || '#'"
					@click="!link.url && $event.preventDefault()"
					:class="[
						'flex items-center rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200',
						link.url
							? 'dark:hover:bg-custom border border-transparent text-gray-700 hover:border-gray-200 hover:bg-white dark:text-white dark:hover:border-gray-700'
							: 'pointer-events-none cursor-not-allowed text-gray-300 dark:text-gray-600',
					]"
					v-html="link.label"
				/>
				<Link
					v-else-if="index === props.links.length - 1"
					:href="link.url || '#'"
					@click="!link.url && $event.preventDefault()"
					:class="[
						'flex items-center rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200',
						link.url
							? 'dark:hover:bg-custom border border-transparent text-gray-700 hover:border-gray-200 hover:bg-white dark:text-white dark:hover:border-gray-700'
							: 'pointer-events-none cursor-not-allowed text-gray-300 dark:text-gray-600',
					]"
					v-html="link.label"
				/>
				<Link
					v-else
					:href="link.url || '#'"
					@click="!link.url && $event.preventDefault()"
					:class="[
						'hidden h-8 min-w-8 items-center justify-center rounded-lg text-sm font-medium transition-all duration-200 md:inline-flex',
						link.active
							? 'bg-black text-white dark:bg-gray-100 dark:text-gray-900'
							: link.url
								? 'dark:hover:bg-custom border border-transparent text-gray-600 hover:border-gray-200 hover:bg-white dark:text-gray-400 dark:hover:border-gray-700 dark:hover:text-white'
								: 'cursor-not-allowed text-gray-400 dark:text-gray-600',
					]"
					v-html="link.label"
				/>
			</template>
		</nav>
	</div>
</template>
