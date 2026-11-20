<script setup>
import Input from '@/components/ui/input/Input.vue'
import Label from '@/components/ui/label/Label.vue'
import Textarea from '@/components/ui/textarea/Textarea.vue'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

// form.seo
defineProps({
	form: {
		type: Object,
		required: true,
	},
})
</script>

<template>
	<div class="mt-6 space-y-4 border-t pt-6">
		<h3 class="text-lg font-medium text-gray-900">{{ t('Seo settings') }}</h3>

		<div>
			<Label class="block text-sm font-medium text-gray-700">
				{{ t('Canonical') }}
			</Label>
			<Input
				v-model="form.seo.canonical"
				type="text"
				class="border-input mt-1 block w-full rounded-md"
				placeholder="Url"
			/>
			<span class="text-xs text-gray-500">{{ form.seo.canonical?.length || 0 }}</span>
		</div>

		<div>
			<Label class="block text-sm font-medium text-gray-700">
				{{ t('Title') }}
			</Label>
			<Input
				v-model="form.seo.title"
				type="text"
				class="border-input mt-1 block w-full rounded-md"
				placeholder="Max 60 znaków"
			/>
			<span class="text-xs text-gray-500">{{ form.seo.title?.length || 0 }}/60</span>
		</div>

		<div>
			<Label class="block text-sm font-medium text-gray-700">
				{{ t('Description') }}
			</Label>
			<Textarea
				v-model="form.seo.description"
				rows="3"
				class="border-input mt-1 block w-full rounded-md"
				placeholder="Max 160"
			></Textarea>
			<span class="text-xs text-gray-500">{{ form.seo.description?.length || 0 }}/160</span>
		</div>

		<div>
			<Label class="block text-sm font-medium text-gray-700">
				{{ t('Keywords') }}
			</Label>
			<Input
				v-model="form.seo.keywords"
				type="text"
				class="border-input mt-1 block w-full rounded-md"
				placeholder="Max 60 znaków"
			/>
			<span class="text-xs text-gray-500">{{ form.seo.keywords?.length || 0 }}/60</span>
		</div>

		<div>
			<Label class="block text-sm font-medium text-gray-700">
				{{ t('Image url') }}
			</Label>
			<Input
				v-model="form.seo.image"
				type="text"
				class="border-input mt-1 block w-full rounded-md"
				placeholder="Url"
			/>
			<span class="text-xs text-gray-500">{{ form.seo.image?.length || 0 }}/255</span>
		</div>

		<div>
			<Label class="block text-sm font-medium text-gray-700">
				{{ t('Schema json') }}
			</Label>
			<Textarea
				v-model="form.seo.schema"
				rows="3"
				class="border-input mt-1 block w-full rounded-md"
			></Textarea>
			<span class="text-xs text-gray-500">{{ form.seo.schema?.length || 0 }}</span>
		</div>

		<div>
			<Label class="block text-sm font-medium text-gray-700">
				{{ t('Alternates json') }}
			</Label>
			<Textarea
				v-model="form.seo.alternates"
				rows="3"
				class="border-input mt-1 block w-full rounded-md"
			></Textarea>
			<span class="text-xs text-gray-500">{{ form.seo.alternates?.length || 0 }}</span>
		</div>

		<div class="flex space-x-6">
			<Label class="flex items-center">
				<input v-model="form.seo.is_noindex" type="checkbox" class="border-input rounded" />
				<span class="ml-2 text-sm text-gray-600">
					{{ t('Block indexing') }} (noindex)
				</span>
			</Label>

			<Label class="flex items-center">
				<Input
					v-model="form.seo.is_nofollow"
					type="checkbox"
					class="border-input rounded"
				/>
				<span class="ml-2 text-sm text-gray-600">
					{{ t('Block follow links') }} (nofollow)
				</span>
			</Label>
		</div>
	</div>
</template>
