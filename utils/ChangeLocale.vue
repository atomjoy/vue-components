<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { router } from '@inertiajs/vue3'
import { watch, onMounted } from 'vue'

const { t, locale, availableLocales, fallbackLocale } = useI18n({
	useScope: 'global',
})

const props = defineProps({
	url: { default: '/change/locale/' },
})

onMounted(() => {
	locale.value = localStorage.getItem('locale-xxx-locale')! ?? fallbackLocale.value ?? 'en'
	// console.log('ChangeLocale', locale.value, availableLocales);
})

watch(
	() => locale.value,
	(l) => {
		console.log('ChangeLocale', locale.value, availableLocales)
		localStorage.setItem('locale-xxx-locale', l)
		changeLocale(l)
	},
)

async function changeLocale(locale: string) {
	if (props.url) {
		router.get(
			props.url + locale,
			{},
			{
				preserveScroll: true,
				preserveState: true,
				preserveErrors: true,
				onSuccess: (response) => {
					console.log('ChangeLocaleUpdated')
				},
				onError: (err) => {
					console.log('ChangeLocaleError', err)
				},
			},
		)
	}
}
</script>

<template>
	<div class="inline-flex items-center">
		<select
			v-model="locale"
			class="m-1 h-9 w-9 cursor-pointer appearance-none rounded-md border border-gray-300 bg-white text-center text-sm font-semibold tracking-wider text-gray-700 uppercase transition-all duration-200 outline-none hover:border-gray-400 hover:bg-gray-50 focus:border-gray-400 focus:ring-2 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700 dark:focus:border-gray-500 dark:focus:ring-gray-900"
			:title="$t('Locales')"
			aria-label="Locales"
		>
			<option v-for="lang in availableLocales" :key="`locale-${lang}`" :value="lang">
				{{ t(lang) }}
			</option>
		</select>
	</div>
</template>

<!--
import { createI18n } from 'vue-i18n'

const lang = {
  // Allow compositions api (required)
  allowComposition: true,
  globalInjection: true,
  legacy: false,

  // Locales
  locale: 'en',
  fallbackLocale: 'en',
  availableLocales: ['en', 'pl'],
  messages: {
    en: { en: "English", pl: "Polish" },
    pl: { en: "Angielski", pl: "Polski" },
  },
}

const i18n = createI18n(lang)
app.use(i18n)
-->
