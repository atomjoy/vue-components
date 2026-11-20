<template>
	<div
		v-if="adCode"
		ref="adContainer"
		:class="[
			'ad-container',
			`ad-${slug}`,
			'my-4',
			'flex',
			'justify-center',
			'w-full',
			'min-h-22.5',
		]"
	></div>
</template>

<script setup>
import { computed, onMounted, ref, watch, nextTick } from 'vue'
import { usePage } from '@inertiajs/vue3'

const props = defineProps({
	slug: {
		type: String,
		required: true,
	},
})

const page = usePage()
const adContainer = ref(null)
const adCode = computed(() => page.props.ads?.[props.slug] || null)

// Funkcja dynamicznie ładująca główny skrypt AdSense (tylko raz dla całej aplikacji)
const loadAdSenseScriptError = () => {
	if (window.adsbygoogleScriptLoaded) return // Jeśli już załadowano, pomiń
	const script = document.createElement('script')
	script.async = true
	script.src = 'https://googlesyndication.com'
	script.crossOrigin = 'anonymous'
	document.head.appendChild(script)
	window.adsbygoogleScriptLoaded = true // Flaga uniemożliwiająca podwójne ładowanie
}

// Funkcja dynamicznie ładująca główny skrypt AdSense (tylko raz dla całej aplikacji)
const loadAdSenseScript = (callback) => {
	if (document.querySelector('script[src*="adsbygoogle.js"]')) {
		if (callback) callback()
		return
	}

	const script = document.createElement('script')
	script.async = true
	script.crossOrigin = 'anonymous'
	const domain = 'https://pagead2.googlesyndication.com'
	const path = '/pagead/js/adsbygoogle.js'
	const query = '?client=ca-pub-1234567890123456'
	script.src = domain + path + query
	if (callback) {
		script.onload = callback
	}
	document.head.appendChild(script)
}

const injectAd = () => {
	if (!adContainer.value || !adCode.value) return
	adContainer.value.innerHTML = ''
	const range = document.createRange()
	const fragment = range.createContextualFragment(adCode.value)
	adContainer.value.appendChild(fragment)
	nextTick(() => {
		try {
			if (adContainer.value.querySelector('.adsbygoogle')) {
				loadAdSenseScript()
				;(window.adsbygoogle = window.adsbygoogle || []).push({})
			}
		} catch (error) {
			console.error('AdSense push error:', error)
		}
	})
}

onMounted(() => injectAd())
watch(adCode, () => {
	nextTick(() => injectAd())
})
</script>
