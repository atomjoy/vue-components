<script setup lang="ts">
import EyebrowDot from './EyebrowDot.vue'
</script>

<template>
	<span class="eyebrow mb-6 flex items-center justify-center gap-2 text-center text-xl uppercase">
		<EyebrowDot /> <slot>Eyebrow...</slot>
	</span>
</template>
