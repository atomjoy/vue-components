<script setup lang="ts">
import ScrollingText from '@/components/atoms/ScrollingText.vue'
// const phrases = ['Fast Shipping', '24/7 Support', 'Premium Quality', 'Eco Friendly']
const phrases = ['Bezpłatna Wycena', 'Szybka Dostawa', 'Wysoka Jakość', 'Rozsądna Cena']
</script>

<template>
	<ScrollingText :words="phrases" speed="60s" direction="right" />
</template>
