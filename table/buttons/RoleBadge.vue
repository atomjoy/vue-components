<script setup>
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
} from '@lucide/vue' // Zależnie od konfiguracji: '@lucide/vue' lub 'lucide-vue-next'

const props = defineProps({
	role: { type: Object, required: true },
})

// Słownik zawierający style oraz przypisane ikony Lucide
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
	trader: {
		icon: Briefcase,
		style: 'bg-blue-500 text-white font-semibold',
	},
	partner: {
		icon: Handshake,
		style: 'bg-yellow-500 text-black font-semibold',
	},
	premium: { icon: Crown, style: 'bg-[#D4AF37] text-white font-semibold' },

	// Blokada
	disable_login: {
		icon: UserX,
		style: 'bg-rose-200 text-rose-700 line-through font-bold dark:bg-rose-955 dark:text-rose-300',
	},
}

const currentRole = computed(() => {
	return (
		roleConfig[props.role.name] || {
			icon: User,
			style: 'bg-secondary text-secondary-foreground',
		}
	)
})
</script>

<template>
	<span
		:class="[
			'inline-flex items-center gap-1 rounded px-2 py-0.5 text-[11px] font-medium whitespace-nowrap',
			currentRole.style,
		]"
	>
		<!-- Dynamiczne renderowanie ikony Lucide -->
		<component :is="currentRole.icon" class="h-3 w-3 shrink-0" />
		<span>{{ role.name }}</span>
	</span>
</template>
