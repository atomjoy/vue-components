<script setup lang="ts">
import { computed } from 'vue'
import {
	ShieldCheck,
	Shield,
	User,
	ShieldAlert,
	LifeBuoy,
	FileText,
	PenTool,
	Calculator,
	Handshake,
	Crown,
	UserX,
	Briefcase,
} from '@lucide/vue'

const props = defineProps<{
	role: string
}>()

const roleConfig = {
	// Administracja
	superadmin: {
		icon: ShieldCheck,
		style: 'bg-red-600 text-white dark:bg-red-955 dark:text-red-300',
	},
	admin: {
		icon: Shield,
		style: 'bg-green-600 text-white dark:bg-green-955 dark:text-green-300',
	},
	user: {
		icon: User,
		style: 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300',
	},

	// Treść
	moderator: {
		icon: ShieldAlert,
		style: 'bg-purple-100 text-purple-700 dark:bg-purple-955 dark:text-purple-300',
	},
	support: {
		icon: LifeBuoy,
		style: 'bg-orange-100 text-orange-600 dark:bg-orange-955 dark:text-orange-300',
	},
	editor: {
		icon: FileText,
		style: 'bg-blue-100 text-blue-700 dark:bg-blue-955 dark:text-blue-300',
	},
	author: {
		icon: PenTool,
		style: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-955 dark:text-indigo-300',
	},

	// Biznes
	accountant: {
		icon: Calculator,
		style: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-955 dark:text-emerald-300',
	},
	partner: {
		icon: Handshake,
		style: 'bg-yellow-500 text-black font-semibold',
	},
	trader: {
		icon: Briefcase,
		style: 'bg-blue-500 text-white font-semibold',
	},
	premium: { icon: Crown, style: 'bg-[#D4AF37] text-white font-semibold' },

	// Blokada
	disable_login: {
		icon: UserX,
		style: 'bg-rose-200 text-rose-700 line-through font-bold dark:bg-rose-955 dark:text-rose-300',
	},
}

const currentRole = computed(() => {
	const roleKey = (props.role || 'user').toLowerCase()

	if (roleKey in roleConfig) {
		return roleConfig[roleKey as keyof typeof roleConfig]
	}

	return {
		icon: User,
		style: 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300',
	}
})
</script>

<template>
	<span
		:class="[
			'inline-flex items-center gap-1 rounded px-2 py-0.5 text-[11px] font-medium whitespace-nowrap capitalize',
			currentRole.style,
		]"
	>
		<component :is="currentRole.icon" class="h-3 w-3 shrink-0" />
		<span>{{ role }}</span>
	</span>
</template>
