<script setup lang="ts">
import { ref } from 'vue'
import { Link } from '@inertiajs/vue3'
import {
	dashboard,
	home,
	login,
	register,
	blog,
	services,
	contact,
	aboutus,
	faqs,
	projects,
	works,
	employees,
	categories,
} from '@/routes'
import { useI18n } from 'vue-i18n'
import { UserShield } from '@lucide/vue'
const { t } = useI18n()

const isMenuOpen = ref(false)
const toggleMenu = () => {
	isMenuOpen.value = !isMenuOpen.value
}
</script>

<template>
	<header
		class="relative mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-6 py-6 md:gap-8 md:py-10"
	>
		<a href="/" :title="t('company.name')">
			<img
				src="/default/logo.svg"
				:alt="t('company.name') + ' logo'"
				width="50"
				height="50"
				class="z-50"
			/>
		</a>

		<!-- Desktop -->
		<nav class="hidden grow items-center justify-start gap-4 pl-6 text-sm md:flex">
			<Link :href="home()" class="inline-block px-2 py-1 leading-normal dark:text-[#EDEDEC]">
				{{ t('home_menu.home') }}
			</Link>
			<Link :href="blog()" class="inline-block px-2 py-1 leading-normal dark:text-[#EDEDEC]">
				{{ t('home_menu.blog') }}
			</Link>
			<Link
				:href="services()"
				class="inline-block px-2 py-1 leading-normal dark:text-[#EDEDEC]"
			>
				{{ t('home_menu.services') }}
			</Link>
			<Link
				:href="projects()"
				class="inline-block px-2 py-1 leading-normal dark:text-[#EDEDEC]"
			>
				{{ t('home_menu.projects') }}
			</Link>
			<!-- <Link
				:href="categories()"
				class="inline-block px-2 py-1 leading-normal dark:text-[#EDEDEC]"
			>
				{{ t('home_menu.categories') }}
			</Link> -->
			<Link :href="faqs()" class="inline-block px-2 py-1 leading-normal dark:text-[#EDEDEC]">
				{{ t('home_menu.faq') }}
			</Link>
			<Link
				:href="aboutus()"
				class="inline-block px-2 py-1 leading-normal dark:text-[#EDEDEC]"
			>
				{{ t('home_menu.about') }}
			</Link>
			<Link
				:href="contact()"
				class="inline-block px-2 py-1 leading-normal dark:text-[#EDEDEC]"
			>
				{{ t('home_menu.contact') }}
			</Link>
		</nav>

		<!-- Auth -->
		<nav class="hidden items-center justify-end gap-4 text-sm md:flex">
			<Link
				v-if="$page.props.auth.user"
				:href="dashboard()"
				class="flex items-center gap-2 px-2 py-1 leading-normal dark:text-[#EDEDEC]"
			>
				{{ t('home_menu.dashboard') }} <UserShield />
			</Link>
			<template v-else>
				<Link
					:href="login()"
					class="inline-block px-2 py-1 leading-normal dark:text-[#EDEDEC]"
				>
					{{ t('home_menu.login') }}
				</Link>
				<Link
					:href="register()"
					class="inline-block px-2 py-1 leading-normal dark:text-[#EDEDEC]"
				>
					{{ t('home_menu.register') }}
				</Link>
			</template>
		</nav>

		<!-- Menu burger -->
		<button
			@click="toggleMenu"
			type="button"
			class="z-50 block p-2 text-gray-600 focus:outline-none md:hidden dark:text-[#EDEDEC]"
			aria-label="Toggle menu"
		>
			<svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
				<path
					v-if="!isMenuOpen"
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M4 6h16M4 12h16M4 18h16"
				/>
				<path
					v-else
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M6 18L18 6M6 6l12 12"
				/>
			</svg>
		</button>

		<!-- Mobilne -->
		<div
			v-if="isMenuOpen"
			class="absolute top-full left-0 z-40 w-full bg-white p-6 shadow-xl md:hidden dark:bg-[#1C1C1A]"
		>
			<nav class="flex flex-col gap-4">
				<!-- Główne linki -->
				<Link
					:href="home()"
					@click="isMenuOpen = false"
					class="block py-2 text-base font-medium dark:text-[#EDEDEC]"
				>
					{{ t('home_menu.home') }}
				</Link>
				<Link
					:href="blog()"
					@click="isMenuOpen = false"
					class="block py-2 text-base font-medium dark:text-[#EDEDEC]"
				>
					{{ t('home_menu.blog') }}
				</Link>
				<Link
					:href="services()"
					@click="isMenuOpen = false"
					class="block py-2 text-base font-medium dark:text-[#EDEDEC]"
				>
					{{ t('home_menu.services') }}
				</Link>
				<Link
					:href="projects()"
					@click="isMenuOpen = false"
					class="block py-2 text-base font-medium dark:text-[#EDEDEC]"
				>
					{{ t('home_menu.projects') }}
				</Link>
				<!-- <Link
					:href="categories()"
					@click="isMenuOpen = false"
					class="block py-2 text-base font-medium dark:text-[#EDEDEC]"
				>
					{{ t('home_menu.categories') }}
				</Link> -->
				<Link
					:href="faqs()"
					@click="isMenuOpen = false"
					class="block py-2 text-base font-medium dark:text-[#EDEDEC]"
				>
					{{ t('home_menu.faq') }}
				</Link>
				<Link
					:href="aboutus()"
					@click="isMenuOpen = false"
					class="block py-2 text-base font-medium dark:text-[#EDEDEC]"
				>
					{{ t('home_menu.about') }}
				</Link>
				<Link
					:href="contact()"
					@click="isMenuOpen = false"
					class="block py-2 text-base font-medium dark:text-[#EDEDEC]"
				>
					{{ t('home_menu.contact') }}
				</Link>

				<hr class="my-2 border-gray-200 dark:border-gray-800" />

				<!-- Linki autoryzacji -->
				<Link
					v-if="$page.props.auth.user"
					:href="dashboard()"
					@click="isMenuOpen = false"
					class="block py-2 text-base font-medium dark:text-[#EDEDEC]"
				>
					<UserShield /> {{ t('home_menu.dashboard') }}
				</Link>
				<template v-else>
					<Link
						:href="login()"
						@click="isMenuOpen = false"
						class="block py-2 text-base font-medium dark:text-[#EDEDEC]"
					>
						{{ t('home_menu.login') }}
					</Link>
					<Link
						:href="register()"
						@click="isMenuOpen = false"
						class="block py-2 text-base font-medium dark:text-[#EDEDEC]"
					>
						{{ t('home_menu.register') }}
					</Link>
				</template>
			</nav>
		</div>
	</header>
</template>
