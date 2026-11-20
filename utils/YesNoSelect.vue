<script setup lang="ts">
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

const modelValue = defineModel<any>({ default: 1 })
</script>

<template>
	<Select v-model="modelValue">
		<SelectTrigger class="mt-1 w-full shadow-none">
			<SelectValue :placeholder="t('Select')" />
		</SelectTrigger>
		<SelectContent>
			<SelectItem :value="0">{{ t('No') }}</SelectItem>
			<SelectItem :value="1">{{ t('Yes') }}</SelectItem>
		</SelectContent>
	</Select>
</template>
