<template>
	<div class="pulse-container">
		<div class="rotate-wrapper">
			<div class="pulse-border"></div>
		</div>
		<div class="square-dot"></div>
	</div>
</template>

<script setup lang="ts">
// Komponent w pełni autonomiczny
</script>

<style>
.pulse-container {
	position: relative;
	display: flex;
	align-items: center;
	justify-content: center;
	width: 30px;
	height: 30px;
}

.square-dot {
	width: 10px;
	height: 10px;
	background-color: #ffcc00;
	border-radius: 50%;
	z-index: 2;
}

.rotate-wrapper {
	position: absolute;
	width: 20px;
	height: 20px;
	display: flex;
	align-items: center;
	justify-content: center;
	animation: rotateBorder 5s linear infinite;
	z-index: 1;
}

.pulse-border {
	width: 100%;
	height: 100%;
	background: #ffcc0044;
	border-radius: 50%;
	box-sizing: border-box;
	animation: pulseBorder 1s ease-in-out infinite;
}

@keyframes rotateBorder {
	0% {
		transform: rotate(0deg);
	}
	100% {
		transform: rotate(360deg);
	}
}

@keyframes pulseBorder {
	0% {
		transform: scale(0);
		opacity: 1;
	}
	50% {
		transform: scale(1.3);
		opacity: 0.5;
	}
	100% {
		transform: scale(1);
		opacity: 0;
		border-radius: 4px;
	}
}
</style>
