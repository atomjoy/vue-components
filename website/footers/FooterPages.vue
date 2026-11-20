<script setup lang="ts">
import { usePage, Link } from '@inertiajs/vue3'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

interface MenuLink {
	id: number
	title: string
	slug: string
}

const page = usePage()
const menu_footer = (page.props?.menu as { footer: MenuLink[] }).footer
</script>

<template>
	<div v-if="menu_footer && menu_footer.length > 0" class="mx-auto w-full max-w-7xl p-8 pt-0">
		<h3 class="text-sm">{{ t('footer.menu.title.pages') }}</h3>
		<nav class="flex flex-wrap gap-4 py-4">
			<Link
				v-for="item in menu_footer"
				:key="item.id"
				:href="'/' + item.slug"
				class="hover:text-custom text-sm font-medium transition-colors"
				:title="item.title"
			>
				{{ item.title }}
			</Link>
		</nav>
	</div>
</template>
