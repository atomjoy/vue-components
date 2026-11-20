<script setup lang="ts">
import MarqueeMarketing from '@/components/elements/MarqueeMarketing.vue'
import FooterPages from '@/components/website/footers/FooterPages.vue'
import ChangeLocale from '@/components/utils/ChangeLocale.vue'
import {
	blog,
	services,
	contact,
	aboutus,
	faqs,
	works,
	categories,
	employees,
	projects,
	references,
} from '@/routes'
import { Mail, MapPin, Phone, Road, Send } from '@lucide/vue'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
</script>

<template>
	<MarqueeMarketing />
	<footer class="w-full border-t font-sans">
		<div class="mx-auto max-w-7xl px-6 py-12 md:flex md:justify-between md:py-16">
			<div class="mb-8 md:mb-0 md:max-w-xs">
				<div class="flex items-center gap-2">
					<div class="flex h-15 items-center justify-center">
						<img src="/default/logo.svg" alt="Company logo" class="h-full" />
					</div>
					<span class="text-xl font-bold tracking-tight">{{ t('company.name') }}</span>
				</div>
				<p class="mt-4 text-lg leading-snug font-semibold">
					{{ t('company.message') }}
				</p>
				<div class="mt-6">
					<div class="mb-1 flex items-center gap-2">
						<MapPin /> {{ t('company.city') }}
					</div>
					<div class="mb-1 flex items-center gap-2">
						<Road /> {{ t('company.street') }}
					</div>
					<div class="mb-1 flex items-center gap-2">
						<Mail />
						<a :href="'mailto:' + t('company.email')" class="hover:text-custom">{{
							t('company.email')
						}}</a>
					</div>
					<div class="mb-1 flex items-center gap-2">
						<Phone />
						<a :href="'tel:' + t('company.phone')" class="hover:text-custom">{{
							t('company.phone')
						}}</a>
					</div>
				</div>
				<div class="flex gap-2 py-6">
					<a
						title="Facebook"
						href="/redirect/social/facebook"
						class="hover:bg-custom rounded-xl bg-black p-2 px-6 text-white"
						target="_blank"
						rel="noopener noreferrer"
					>
						<i class="fa-brands fa-facebook"></i>
					</a>
					<a
						title="Youtube"
						href="/redirect/social/youtube"
						class="hover:bg-custom rounded-xl bg-black p-2 px-6 text-white"
						target="_blank"
						rel="noopener noreferrer"
					>
						<i class="fa-brands fa-youtube"></i>
					</a>
					<a
						title="X"
						href="/redirect/social/x"
						class="hover:bg-custom rounded-xl bg-black p-2 px-6 text-white"
						target="_blank"
						rel="noopener noreferrer"
					>
						<i class="fa-brands fa-x-twitter"></i>
					</a>
				</div>
			</div>

			<div class="grid grid-cols-2 gap-8 sm:grid-cols-4">
				<div>
					<h3 class="text-sm">{{ t('footer.menu.title.location') }}</h3>

					<ul class="mt-4 space-y-2 text-sm font-medium">
						<li>
							<a
								href="/strony-internetowe/warszawa"
								class="hover:underline"
								title="Strony internetowe Warszawa"
							>
								Warszawa
							</a>
						</li>
						<li>
							<a
								href="/strony-internetowe/przasnysz"
								class="hover:underline"
								title="Strony internetowe Przasnysz"
							>
								Przasnysz
							</a>
						</li>
						<li>
							<a
								href="/strony-internetowe/ciechanow"
								class="hover:underline"
								title="Strony internetowe Ciechanów"
							>
								Ciechanów
							</a>
						</li>
						<li>
							<a
								href="/strony-internetowe/ostroleka"
								class="hover:underline"
								title="Strony internetowe Ostrołęka"
							>
								Ostrołęka
							</a>
						</li>
						<li>
							<a
								href="/strony-internetowe/mlawa"
								class="hover:underline"
								title="Strony internetowe Mława"
							>
								Mława
							</a>
						</li>
					</ul>
				</div>

				<div>
					<h3 class="text-sm">{{ t('footer.menu.title.company') }}</h3>
					<ul class="mt-4 space-y-2 text-sm font-medium">
						<li>
							<a
								:href="blog().url"
								class="hover:underline"
								:title="t('footer.link.blog')"
								>{{ t('footer.link.blog') }}</a
							>
						</li>
						<li>
							<a
								:href="services().url"
								class="hover:underline"
								:title="t('footer.link.services')"
								>{{ t('footer.link.services') }}</a
							>
						</li>
						<li>
							<a
								:href="references().url"
								class="hover:underline"
								:title="t('footer.link.reference')"
								>{{ t('footer.link.reference') }}</a
							>
						</li>
						<li>
							<a
								:href="faqs().url"
								class="hover:underline"
								:title="t('footer.link.faq')"
								>{{ t('footer.link.faq') }}</a
							>
						</li>
						<li>
							<a
								:href="aboutus().url"
								class="hover:underline"
								:title="t('footer.link.about')"
								>{{ t('footer.link.about') }}</a
							>
						</li>
						<li>
							<a
								:href="contact().url"
								class="hover:underline"
								:title="t('footer.link.contact')"
								>{{ t('footer.link.contact') }}</a
							>
						</li>
					</ul>
				</div>

				<div>
					<h3 class="text-sm">{{ t('footer.menu.title.resources') }}</h3>
					<ul class="mt-4 space-y-2 text-sm font-medium">
						<li>
							<a
								:href="works().url"
								class="hover:underline"
								:title="t('footer.link.works')"
								>{{ t('footer.link.works') }}</a
							>
						</li>
						<li>
							<a
								:href="employees().url"
								class="hover:underline"
								:title="t('footer.link.employees')"
								>{{ t('footer.link.employees') }}</a
							>
						</li>
						<li>
							<a
								:href="categories().url"
								class="hover:underline"
								:title="t('footer.link.categories')"
								>{{ t('footer.link.categories') }}</a
							>
						</li>
						<li>
							<a
								:href="projects().url"
								class="hover:underline"
								:title="t('footer.link.projects')"
								>{{ t('footer.link.projects') }}</a
							>
						</li>
					</ul>
				</div>

				<!-- Subscribe -->
				<div>
					<h3 class="text-sm">{{ t('footer.menu.title.newsletter') }}</h3>
					<div class="mt-4 space-y-2">
						<a
							href="/subscribe"
							class="hover:bg-custom border-custom text-custom flex w-full items-center justify-center gap-2 rounded-md border px-3 py-1.5 font-semibold hover:text-white"
						>
							<Send class="text-current" />
							<span>{{ t('footer.link.subscribe') }}</span>
						</a>
					</div>
				</div>
			</div>
		</div>

		<FooterPages />

		<div class="bg-custom px-6 py-4 text-xs font-medium text-[#111111]">
			<div class="mx-auto flex max-w-7xl flex-col gap-4 sm:flex-row sm:justify-between">
				<div>
					<ChangeLocale />
					<span>© {{ t('company.name') }} 2026 {{ t('footer.rights') }}</span>
				</div>
				<div class="flex items-center gap-6">
					<a href="/regulamin" class="hover:underline">
						{{ t('footer.terms-of-service') }}
					</a>
					<a href="/polityka-prywatnosci" class="hover:underline">
						{{ t('footer.privacy-policy') }}
					</a>
				</div>
			</div>
		</div>
	</footer>
</template>
