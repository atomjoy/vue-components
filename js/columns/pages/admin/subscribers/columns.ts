import ActionsDropdown from '@/components/table/dropdowns/ActionsDropdown.vue'
import CheckboxCell from '@/components/table/buttons/CheckboxCell.vue'
import StatusBadgeSubscribers from '@/components/table/buttons/StatusBadgeSubscribers.vue'
import { h } from 'vue'
import { i18n } from '@/i18n'
import { formatDate } from '@/utils/userHelpers'
import { User, ColumnOptions, TableColumn, toggleAll, toggleRow } from '@/types/pages'

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
		key: 'email',
		label: t('Email'),
		sortable: true,
		render: (_: any, row: any) =>
			h('a', { href: 'mailto:' + row.email, class: 'hover:text-custom' }, row.email),
	},
	{
		key: 'name',
		label: t('Name'),
		sortable: true,
		render: (_: any, row: any) => h('span', {}, row.name ?? ''),
	},
	{
		key: 'status',
		label: t('Status'),
		sortable: true,
		render: (_: any, row: any) => h(StatusBadgeSubscribers, { status: row.status ?? '' }),
	},
	{
		key: 'created_at',
		label: t('Created'),
		sortable: true,
		render: (date: string) =>
			h('span', { class: 'text-muted-foreground text-xs' }, formatDate(date)),
	},
	{
		key: 'actions',
		label: '',
		render: (value: any, row: Object) =>
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
