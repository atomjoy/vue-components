<script setup lang="ts">
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

interface Props {
	errors: Record<string, string>
	showAll?: boolean
}

const props = withDefaults(defineProps<Props>(), {
	showAll: false,
})
</script>

<template>
	<div v-if="Object.keys(errors).length > 0" class="mb-6 text-red-500">
		<div>{{ t('Some errors occurred') }}</div>

		<ul v-if="props.showAll" class="mt-1 list-inside list-disc text-sm">
			<li v-for="(error, key) in errors" :key="key">
				{{ error }}
			</li>
		</ul>
	</div>
</template>
