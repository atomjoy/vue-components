<!--
const marketingPhrases = ['Fast Shipping', '24/7 Support', 'Premium Quality', 'Eco Friendly']
<ScrollingText :words="marketingPhrases" speed="40s" direction="right" />
-->

<template>
	<div
		class="marquee-container"
		:style="{ '--speed': speed }"
		:class="{ 'pause-on-hover': pauseOnHover }"
	>
		<div
			v-for="i in 2"
			:key="i"
			class="marquee-track"
			:class="`scroll-${direction}`"
			aria-hidden="true"
		>
			<div v-for="(word, index) in extendedWords" :key="index" class="marquee-item">
				<span class="word-text">{{ word }}</span>
				<span class="separator-icon">★</span>
				<!-- <span class="separator-icon"><Asterisk /></span> -->
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
// import { Asterisk } from '@lucide/vue'

interface Props {
	words: string[]
	speed?: string
	direction?: 'left' | 'right'
	pauseOnHover?: boolean
	repeatCount?: number
}

const props = withDefaults(defineProps<Props>(), {
	words: () => ['Vue', 'TypeScript', 'CSS', 'Php', 'Laravel'],
	speed: '60s',
	direction: 'left',
	pauseOnHover: true,
	repeatCount: 5,
})

const extendedWords = computed(() => {
	return Array.from({ length: props.repeatCount }, () => props.words).flat()
})
</script>

<style scoped>
.marquee-container {
	overflow: hidden;
	position: relative;
	display: flex;
	width: 100%;
	color: #000;
	background-color: #fdc50a;
	padding: 1rem 0;
	user-select: none;
}

.marquee-track {
	display: flex;
	align-items: center;
	white-space: nowrap;
	will-change: transform;
}

.scroll-left {
	animation: scrollLeft var(--speed) linear infinite;
}

@keyframes scrollLeft {
	0% {
		transform: translateX(0%);
	}
	100% {
		transform: translateX(-100%);
	}
}

.scroll-right {
	animation: scrollRight var(--speed) linear infinite;
}

@keyframes scrollRight {
	0% {
		transform: translateX(-100%);
	}
	100% {
		transform: translateX(0%);
	}
}

.pause-on-hover:hover .marquee-track {
	animation-play-state: paused;
}

.marquee-item {
	display: flex;
	align-items: center;
	font-family: Poppins;
	/* font-size: clamp(1.2rem, 3vw, 2rem); */
	font-size: clamp(1.2rem, 2vw, 1.5rem);
	font-weight: 500;
	text-transform: capitalize;
	letter-spacing: 0.05em;
}

.word-text {
	margin: 0 1.5rem;
}

.separator-icon {
	font-size: 1.2rem;
	color: #000;
}
</style>
