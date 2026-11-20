<script setup>
import { usePage } from '@inertiajs/vue3'
import { computed } from 'vue'

const page = usePage()
const locale = computed(() => {
	return page.flash.locale ?? ''
})
</script>

<template>
	<div v-if="locale" class="toast">Sever locale {{ locale }}</div>
</template>
