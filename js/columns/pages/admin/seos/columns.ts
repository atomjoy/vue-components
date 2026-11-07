import ActionsDropdown from '@/components/table/dropdowns/ActionsDropdown.vue'
import CheckboxCell from '@/components/table/buttons/CheckboxCell.vue'
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
		key: 'title',
		label: t('Title'),
		sortable: true,
		render: (_: any, row: any) => h('span', {}, row.title),
	},
	{
		key: 'path',
		label: t('Url path'),
		sortable: true,
		render: (_: any, row: any) => h('span', {}, row.path),
	},
	{
		key: 'description',
		label: t('Description'),
		sortable: true,
		render: (_: any, row: any) => h('span', {}, row.description?.slice(0, 100)),
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
