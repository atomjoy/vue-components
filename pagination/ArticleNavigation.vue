<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import AvatarImage from '@/components/table/AvatarImage.vue'
const { t } = useI18n()

interface RelatedArticle {
	id: number
	slug: string
	title: string
	image?: string
	author?: any
	formatted_author?: any
}

interface NavigationProps {
	navigation: {
		prev: RelatedArticle | null
		next: RelatedArticle | null
		rand: RelatedArticle[]
	}
}

const props = defineProps<NavigationProps>()
const prevArticle = computed(() => props.navigation.prev)
const nextArticle = computed(() => props.navigation.next)
const randomArticles = computed(() => props.navigation.rand)
</script>

<template>
	<div class="my-12 font-sans">
		<!-- Poprzedni / Następny -->
		<nav
			class="border-input mb-12 flex flex-col justify-between gap-6 border-y py-6 sm:flex-row"
			aria-label="Nawigacja wpisów"
		>
			<div class="flex-1">
				<a
					v-if="prevArticle"
					:href="`/blog/${prevArticle.slug}`"
					class="group flex flex-col no-underline"
				>
					<span class="mb-1 text-xs font-medium tracking-wider text-gray-400 uppercase">
						← {{ t('Poprzedni wpis') }}
					</span>
					<strong
						class="group-hover:text-custom line-clamp-2 text-lg font-semibold transition-colors duration-200"
					>
						{{ t(prevArticle.title) }}
					</strong>
				</a>
				<span v-else class="text-sm text-gray-400 italic">{{
					t('Brak nowszych wpisów')
				}}</span>
			</div>

			<div class="flex-1 sm:text-right">
				<a
					v-if="nextArticle"
					:href="`/blog/${nextArticle.slug}`"
					class="group flex flex-col no-underline"
				>
					<span class="mb-1 text-xs font-medium tracking-wider text-gray-400 uppercase">
						{{ t('Następny wpis') }} →
					</span>
					<strong
						class="group-hover:text-custom line-clamp-2 text-lg font-semibold transition-colors duration-200"
					>
						{{ t(nextArticle.title) }}
					</strong>
				</a>
				<span v-else class="text-sm text-gray-400 italic">{{
					t('Brak starszych wpisów')
				}}</span>
			</div>
		</nav>

		<!-- Losowe propozycje -->
		<section v-if="randomArticles.length > 0" class="mt-8">
			<h3 class="mb-6 text-2xl font-bold tracking-tight">
				{{ t('Zobacz także') }}
			</h3>

			<div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
				<article
					v-for="item in randomArticles"
					:key="item.id"
					class="group border-input flex flex-col overflow-hidden rounded border-none transition-all duration-300 hover:-translate-y-1"
				>
					<a
						:href="`/blog/${item.slug}`"
						:title="item.title"
						class="flex h-full flex-col text-inherit no-underline"
					>
						<div class="border-input aspect-video w-full overflow-hidden">
							<img
								:src="item.image ? item.image : '/default/article/no-image.webp'"
								:alt="item.title"
								class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
								loading="lazy"
							/>
						</div>

						<div class="flex grow flex-col pt-4">
							<h4
								class="group-hover:text-custom mb-2 line-clamp-2 text-base leading-snug font-semibold transition-colors duration-200"
							>
								{{ t(item.title) }}
							</h4>
							<p
								v-if="item?.author"
								class="mt-auto flex flex-row items-center gap-2 pt-4 text-sm"
							>
								<AvatarImage
									:name="item?.author?.name"
									:image="
										item?.author?.avatar
											? '/image/' + item?.author?.avatar
											: '/default/user.webp'
									"
									class="h-8 w-8"
								/>
								<span class="text-sm text-gray-500">
									{{ item.author?.name }}
								</span>
							</p>
						</div>
					</a>
				</article>
			</div>
		</section>
	</div>
</template>
