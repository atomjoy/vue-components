<script setup lang="ts">
import ScrollingText from '@/components/atoms/ScrollingText.vue'

const phrases = ['Vue 3', 'TypeScript', 'Vite', 'Inertia', 'Tailwind CSS', 'Laravel', 'Php']
</script>

<template>
	<ScrollingText :words="phrases" speed="60s" direction="left" />
</template>
