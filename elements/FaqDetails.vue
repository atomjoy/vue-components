<script setup lang="ts">
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

defineProps<{
	question: string
	answer: string
	email: string
}>()
</script>

<template>
	<details
		class="faq-item mb-4 w-full rounded-[10px] border border-[#111] font-['Poppins'] text-[18px] transition-all duration-300 open:shadow-md dark:border-white"
	>
		<summary
			class="faq-summary flex cursor-pointer list-none items-start justify-between p-6.25 [&::-webkit-details-marker]:hidden"
		>
			<h3 class="faq-title m-0 text-[1.2rem] font-semibold">
				{{ t(question) }}
			</h3>
			<i
				class="faq-icon fa-solid fa-plus p-1.25 text-[#30a444] transition-transform duration-300 [.faq-item[open]_&]:rotate-45"
			></i>
		</summary>
		<div class="faq-content mt-4 px-6.25 pb-6.25 leading-[1.6]">
			<div v-html="answer" class="whitespace-pre-line"></div>

			<div>
				<a
					v-if="email.length > 3"
					:href="'mailto:' + email"
					target="_blank"
					rel="noopener noreferrer"
					title="Email"
					class="faq-link mt-4 inline-flex items-center justify-center rounded-[10px] bg-black px-6.25 py-3.25 text-[1rem] font-semibold text-white no-underline transition-colors duration-200 hover:bg-[#30a444]"
				>
					{{ t('Send message') }}
					<i style="margin-left: 20px" class="fa-solid fa-paper-plane"></i>
				</a>
			</div>
		</div>
	</details>
</template>
