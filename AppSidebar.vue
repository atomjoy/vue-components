<script setup lang="ts">
import { Link, router } from '@inertiajs/vue3'
import {
	FileArchive,
	LayoutGrid,
	Users,
	Book,
	Shapes,
	MessageSquare,
	TrendingUp,
	Cog,
	ShieldQuestion,
	Image,
	Contact,
	Star,
	Projector,
	Mailbox,
	BriefcaseBusiness,
	Funnel,
	ChartSpline,
	SquareText,
	SendHorizonal,
	Handshake,
	BookUser,
	SearchCheck,
} from '@lucide/vue'
import AppLogo from '@/components/AppLogo.vue'
import NavFooter from '@/components/NavFooter.vue'
import NavMain from '@/components/NavMain.vue'
import NavUser from '@/components/NavUser.vue'
import NavAdmin from '@/components/NavAdmin.vue'
import NavBlog from '@/components/NavBlog.vue'
import NavTrader from './NavTrader.vue'
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	useSidebar,
} from '@/components/ui/sidebar'
import { dashboard } from '@/routes'
import type { NavItem } from '@/types'
import { can, hasRole } from '@/composables/pages/useAuth'

const { isMobile, setOpenMobile } = useSidebar()

router.on('navigate', () => {
	if (isMobile.value) {
		setOpenMobile(false)
	}
})

const mainNavItems: NavItem[] = [
	{
		title: 'Dashboard',
		href: dashboard(),
		icon: LayoutGrid,
	},
	{
		title: 'Comments',
		href: '/client/comments',
		icon: MessageSquare,
	},
]

const traderNavItems: NavItem[] = [
	{
		title: 'Leads',
		href: '/admin/leads',
		icon: Funnel,
	},
	{
		title: 'Deals',
		href: '/admin/deals',
		icon: Handshake,
	},
]

const adminNavItems: NavItem[] = [
	{
		title: 'Comments',
		href: '/admin/comments',
		icon: MessageSquare,
	},
	{
		title: 'Employees',
		href: '/admin/employees',
		icon: BriefcaseBusiness,
	},
	{
		title: 'Faqs',
		href: '/admin/faqs',
		icon: ShieldQuestion,
	},
	{
		title: 'Galleries',
		href: '/admin/galleries',
		icon: Image,
	},
	{
		title: 'Newsletters',
		href: '/admin/newsletters',
		icon: SendHorizonal,
	},
	{
		title: 'Pages',
		href: '/admin/pages',
		icon: SquareText,
	},
	{
		title: 'Projects',
		href: '/admin/projects',
		icon: Projector,
	},
	{
		title: 'References',
		href: '/admin/references',
		icon: Star,
	},
	{
		title: 'Services',
		href: '/admin/services',
		icon: Cog,
	},
	{
		title: 'Subscribers',
		href: '/admin/subscribers',
		icon: Mailbox,
	},
	{
		title: 'Users',
		href: '/admin/users',
		icon: Users,
	},
	{
		title: 'Works',
		href: '/admin/works',
		icon: BookUser,
	},
	{
		title: 'Seo',
		href: '/admin/seos',
		icon: SearchCheck,
	},
	{
		title: 'Analytics',
		href: '/admin/analytics',
		icon: TrendingUp,
	},
	{
		title: 'Utm Report',
		href: '/admin/utm-reports',
		icon: ChartSpline,
	},
]

const blogNavItems: NavItem[] = [
	{
		title: 'Articles',
		href: '/admin/articles',
		icon: Book,
	},
	{
		title: 'Categories',
		href: '/admin/categories',
		icon: Shapes,
	},
]

const footerNavItems: NavItem[] = [
	{
		title: 'File Manager',
		href: '/file-manager',
		icon: FileArchive,
	},
]
</script>

<template>
	<Sidebar collapsible="icon" variant="inset">
		<SidebarHeader>
			<SidebarMenu>
				<SidebarMenuItem>
					<SidebarMenuButton size="lg" as-child>
						<Link :href="dashboard()">
							<AppLogo />
						</Link>
					</SidebarMenuButton>
				</SidebarMenuItem>
			</SidebarMenu>
		</SidebarHeader>

		<SidebarContent class="scrollbar-sidebar">
			<NavMain :items="mainNavItems" />

			<NavBlog
				:items="blogNavItems"
				v-if="
					hasRole('author') ||
					hasRole('editor') ||
					hasRole('admin') ||
					hasRole('superadmin')
				"
			/>

			<NavTrader
				:items="traderNavItems"
				v-if="hasRole('trader') || hasRole('admin') || hasRole('superadmin')"
			/>

			<NavAdmin :items="adminNavItems" v-if="hasRole('admin') || hasRole('superadmin')" />
		</SidebarContent>

		<SidebarFooter>
			<NavFooter
				:items="footerNavItems"
				v-if="
					hasRole('author') ||
					hasRole('editor') ||
					hasRole('trader') ||
					hasRole('admin') ||
					hasRole('superadmin')
				"
			/>
			<NavUser />
		</SidebarFooter>
	</Sidebar>
	<slot />
</template>
