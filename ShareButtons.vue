<script setup lang="ts">
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

interface Props {
	url: string
	title?: string
}

const props = withDefaults(defineProps<Props>(), {
	title: '',
})

const copied = ref<boolean>(false)
const encodedUrl = computed<string>(() => encodeURIComponent(props.url))
const encodedTitle = computed<string>(() => encodeURIComponent(props.title))

const facebookUrl = computed<string>(() => `https://facebook.com?url=${encodedUrl.value}`)
const linkedinUrl = computed<string>(
	() => `https://linkedin.com/sharing/share-offsite/?url=${encodedUrl.value}`,
)
const twitterUrl = computed<string>(
	() => `https://twitter.com?url=${encodedUrl.value}&text=${encodedTitle.value}`,
)

const copyToClipboard = async (): Promise<void> => {
	try {
		await navigator.clipboard.writeText(props.url)
		copied.value = true
		setTimeout(() => {
			copied.value = false
		}, 2000)
	} catch (err) {
		console.error('Nie udało się skopiować linku', err)
	}
}
</script>

<template>
	<div class="my-6">
		<h3 class="mb-3 text-sm font-medium tracking-wider text-slate-500 uppercase">
			{{ t('Share') }}
		</h3>
		<div class="flex flex-wrap gap-2">
			<a
				:href="twitterUrl"
				target="_blank"
				@click.stop
				rel="noopener noreferrer"
				class="hover:text-custom hover:border-custom inline-flex items-center gap-2 rounded-md border border-slate-600 px-3 py-1.5 text-sm font-medium text-slate-600 transition-all duration-200"
			>
				<span class="text-xs font-bold">X</span>
				<span>X</span>
			</a>
			<a
				:href="facebookUrl"
				target="_blank"
				@click.stop
				rel="noopener noreferrer"
				class="hover:text-custom hover:border-custom inline-flex items-center gap-2 rounded-md border border-slate-600 px-3 py-1.5 text-sm font-medium text-slate-600 transition-all duration-200"
			>
				<span class="text-xs font-bold">f</span>
				<span>Facebook</span>
			</a>
			<a
				:href="linkedinUrl"
				target="_blank"
				@click.stop
				rel="noopener noreferrer"
				class="hover:border-custom hover:text-custom inline-flex items-center gap-2 rounded-md border border-slate-600 px-3 py-1.5 text-sm font-medium text-slate-600 transition-all duration-200"
			>
				<span class="text-xs font-bold">in</span>
				<span>LinkedIn</span>
			</a>
			<button
				@click="copyToClipboard"
				class="hover:text-custom hover:border-custom inline-flex items-center gap-2 rounded-md border border-slate-600 px-3 py-1.5 text-sm font-medium text-slate-600 transition-all duration-200"
			>
				<span class="text-xs">Link</span>
				<span>{{ copied ? t('Copied') : t('Copy') }}</span>
			</button>
		</div>
	</div>
</template>
