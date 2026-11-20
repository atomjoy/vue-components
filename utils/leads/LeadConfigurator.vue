<script setup lang="ts">
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
const steps: any = []
const submit = () => {
	//
}

// // Definicja pojedynczego kroku/komponentu vue konfiguratora (Strona www)
// interface ConfiguratorStep {
// 	id: string
// 	label: string
// 	component: string
// 	value: any
// }
// // Główna tablica
// const steps = ref<ConfiguratorStep[]>([
// 	{ id: 'color', label: 'Wybierz kolor', component: 'ColorPicker', value: 'red' },
// 	{ id: 'size', label: 'Wybierz rozmiar', component: 'SizeSelector', value: 'XL' },
// ])
// // Funkcja pozwalająca dorzucić kolejny komponent w locie
// const addComponent = (newStep: ConfiguratorStep) => {
// 	steps.value.push(newStep)
// }
</script>
<template>
	<div class="configurator-steps">
		<div v-for="step in steps" :key="step.id" class="step-wrapper">
			<h3>{{ step.label }}</h3>

			<!-- Dynamiczny komponent przekazuje i odbiera wartość przez v-model -->
			<component :is="step.component" v-model="step.value" />
		</div>

		<button @click="submit">{{ t('Send') }}</button>
	</div>
</template>
