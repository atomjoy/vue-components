<script setup lang="ts">
import { onMounted } from 'vue'
import { loadSplide } from '@/utils/loadSplide'
import hljs from 'highlight.js'
import 'highlight.js/styles/github.css'

interface Props {
	html: string
}

const props = withDefaults(defineProps<Props>(), {
	html: '',
})

onMounted(() => {
	loadSplide()
	hljs.highlightAll()
})
</script>

<template>
	<div
		v-html="html"
		class="prose dark:prose-invert markdown mt-1 max-w-none rounded border p-4 dark:border-[#333]"
	></div>
</template>
