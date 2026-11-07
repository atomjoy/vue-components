<script setup lang="ts">
import { Star } from '@lucide/vue'
import { computed, ref } from 'vue'

const props = defineProps<{
	vote: string | number
}>()

const vote: any = computed(() => {
	return Number(props.vote) > 5 ? Number(5).toFixed(1) : Number(props.vote).toFixed(1)
})

const percent = ref({ width: 20 * vote.value + '%' })
</script>

<template>
	<div class="votes">
		<div class="stars">
			<div class="box"><Star /><Star /><Star /><Star /><Star /></div>
			<div class="box_up" :style="percent"><Star /><Star /><Star /><Star /><Star /></div>
		</div>
	</div>
</template>

<style>
.votes {
	width: 100px;
	height: 20px;
	font-weight: 700;
	margin-bottom: 10px;
}

.votes .stars {
	position: relative;
	float: left;
	width: 100px;
	height: 20px;
}

.votes .stars .box,
.votes .stars .box_up {
	position: absolute;
	top: 0px;
	left: 0px;
	overflow: hidden;
	white-space: nowrap;
}

.votes .stars .box {
	z-index: 1;
}

.votes .stars .box_up {
	z-index: 2;
}

.votes .stars svg {
	display: inline;
	box-sizing: border-box;
	width: 20px;
	height: 20px;
	overflow: hidden;
}
.votes .stars .box svg * {
	fill: #eee;
	stroke: #eee;
}

.votes .stars .box_up svg * {
	fill: #fc0;
	stroke: #fc0;
}
</style>
