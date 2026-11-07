// Use with
// import { can } from '@/composables/pages/useAuth';
// <div v-if="can('blog.article.publish')">...</div>
// <button v-if="can('blog.articles.publish')">Editor</button>

import { usePage, router } from '@inertiajs/vue3'
import { toast } from 'vue-sonner'
import { i18n } from '@/i18n'

const t = i18n.global.t

// Sprawdzanie uprawnień
export const can = (permission: string): boolean => {
	const page = usePage()
	const permissions = (page.props.auth as any)?.user?.permissions || []
	return permissions.includes(permission)
}

// Sprawdzanie ról
export const hasRole = (role: string): boolean => {
	const page = usePage()
	const roles = (page.props.auth as any)?.user?.roles || []
	return roles.includes(role)
}

// Nawigacja na podstawie uprawnienia
export const goToCan = (
	url: string,
	permission: string = 'access-settings',
	options: Record<string, any> = {},
): void => {
	if (!can(permission)) {
		toast.error(t('No permissions!'), {
			description: t('You do not have the required permissions to enter this page.'),
		})
		return
	}
	router.visit(url, options)
}

// Nawigacja na podstawie roli
export const goToHasRole = (
	url: string,
	role: string = 'admin',
	options: Record<string, any> = {},
): void => {
	if (!hasRole(role)) {
		toast.error(t('Access denied!'), {
			description: t('You do not have access to this section.'),
		})
		return
	}
	router.visit(url, options)
}
