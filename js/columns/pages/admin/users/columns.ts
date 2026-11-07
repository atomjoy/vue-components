import ActionsDropdown from '@/components/table/dropdowns/ActionsDropdownPermissions.vue'
import StatusBadge from '@/components/table/buttons/StatusBadge.vue'
import RoleBadge from '@/components/table/buttons/RoleBadge.vue'
import CheckboxCell from '@/components/table/buttons/CheckboxCell.vue'
import { h } from 'vue'
import { i18n } from '@/i18n'
import { CheckCircle2 } from '@lucide/vue'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { getAvatarFallback, formatDate } from '@/utils/userHelpers'
import { User, ColumnOptions, TableColumn, toggleAll, toggleRow } from '@/types/pages'
import UserInfo from '@/components/table/UserInfo.vue'

const t = i18n.global.t

export const getColumns = (options: ColumnOptions): TableColumn[] => [
	// Checkbox
	{
		key: 'id',
		label: '',
		render: (id: number | string | undefined, row: User) =>
			h(CheckboxCell, {
				id: id,
				row: row,
				options: options,
				toggleAll: toggleAll,
				toggleRow: toggleRow,
			}),
		sortable: false,
	},
	{
		key: 'id',
		label: 'ID',
		sortable: true,
		render: (id: number | undefined) =>
			id === undefined
				? h('span', { class: 'text-muted-foreground font-mono text-xs' }, 'ID')
				: h('span', { class: 'text-muted-foreground font-mono text-xs' }, `${id}`),
	},
	{
		key: 'name',
		label: t('User'),
		sortable: true,
		render: (_: any, row: User) =>
			h('div', { class: 'flex items-center gap-3' }, [
				h(
					Avatar,
					{ class: 'h-12 w-12 border' },
					{
						default: () => [
							h(AvatarImage, {
								src: (row as any)?.avatar ?? '',
								alt: 'Avatar',
							}),
							h(
								AvatarFallback,
								{
									class: 'bg-secondary text-secondary-foreground text-xs font-semibold',
								},
								{ default: () => getAvatarFallback(row.name) },
							),
						],
					},
				),
				h(UserInfo, { row: row }),
			]),
	},
	{
		key: 'roles',
		label: t('Roles'),
		sortable: false,
		render: (roles: User['roles'], _: any) =>
			h(
				'div',
				{ class: 'flex max-w-50 flex-wrap gap-1' },
				roles.length === 0
					? [h('span', { class: 'text-muted-foreground text-xs' }, 'guest')]
					: roles.map((role) => h(RoleBadge, { role: role })),
			),
	},
	{
		key: 'email_verified_at',
		label: t('Verification'),
		sortable: true,
		render: (_: any, row: User) =>
			h(StatusBadge, {
				type: 'email',
				verifiedAt: row.email_verified_at,
				twoFactorConfirmedAt: row.two_factor_confirmed_at,
			}),
	},
	{
		key: 'two_factor_confirmed_at',
		label: t('Status 2FA'),
		sortable: true,
		render: (_: any, row: User) =>
			h(StatusBadge, {
				type: '2fa',
				verifiedAt: row.email_verified_at,
				twoFactorConfirmedAt: row.two_factor_confirmed_at,
			}),
	},
	{
		key: 'created_at',
		label: t('Created'),
		sortable: true,
		render: (date: string) =>
			h('span', { class: 'text-muted-foreground text-xs' }, formatDate(date)),
	},
	{
		key: 'deleted_at',
		label: t('Deleted'),
		sortable: true,
		render: (date: string | null) => {
			return Boolean(date)
				? h('span', { class: 'h-4 w-4 text-destructive text-xs' }, formatDate(String(date)))
				: h(CheckCircle2, { class: 'h-4 w-4 text-green-500' })
		},
	},
	{
		key: 'actions',
		label: '',
		render: (value: any, row: User) =>
			h(ActionsDropdown, {
				routeUrl: options.basePath,
				row: row,
				onDelete: (id: number) => {
					// console.log('Deleted: ', id)
				},
			}),
		sortable: false,
	},
]
