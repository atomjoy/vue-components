import ActionsDropdown from '@/components/table/dropdowns/ActionsDropdownPermissions.vue'
import StatusBadge from '@/components/table/buttons/StatusBadge.vue'
import RoleBadge from '@/components/table/buttons/RoleBadge.vue'
import { h } from 'vue'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { getAvatarFallback, formatDate } from '@/utils/userHelpers.js'
import { User, ColumnOptions, TableColumn, toggleAll, toggleRow } from '@/types/pages'
import CheckboxCell from '@/components/table/buttons/CheckboxCell.vue'

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
		// h('input', {
		// 	type: 'checkbox',
		// 	checked:
		// 		id === undefined
		// 			? options.isAllSelected.value
		// 			: options.selectedIds.value.includes(row.id),
		// 	onChange: () => {
		// 		if (id === undefined) {
		// 			toggleAll(options.isAllSelected, options.selectedIds, options.rows)
		// 		} else {
		// 			toggleRow(row.id, options.selectedIds)
		// 		}
		// 	},
		// 	class: 'rounded border-gray-300 text-gray-600 focus:ring-gray-500 h-4 w-4',
		// }),
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
		label: 'User',
		sortable: true,
		render: (_: any, row: User) =>
			h('div', { class: 'flex items-center gap-3' }, [
				h(
					Avatar,
					{ class: 'h-9 w-9 border' },
					{
						default: () => [
							h(AvatarImage, {
								src: (row as any)?.image ?? '',
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
				h('div', { class: 'flex flex-col' }, [
					h('span', { class: 'text-foreground font-medium' }, row.name),
					h('span', { class: 'text-muted-foreground text-xs' }, row.email),
				]),
			]),
	},
	{
		key: 'roles',
		label: 'Roles',
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
		label: 'Verification',
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
		label: 'Status 2FA',
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
		label: 'Created',
		sortable: true,
		render: (date: string) =>
			h('span', { class: 'text-muted-foreground text-xs' }, formatDate(date)),
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
