import ActionsDropdown from '@/components/table/dropdowns/ActionsDropdown.vue'
import CheckboxCell from '@/components/table/buttons/CheckboxCell.vue'
import StatusBadgeLeads from '@/components/table/buttons/StatusBadgeLeads.vue'
import ContactInfo from '@/components/table/ContactInfo.vue'
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
		label: t('Contact'),
		sortable: true,
		render: (_: any, row: any) =>
			h(ContactInfo, { name: row.name, email: row.email, phone: row.phone }),
	},
	{
		key: 'name',
		label: t('Trader'),
		sortable: true,
		render: (_: any, row: any) => h('span', {}, row?.trader?.name ?? ''),
	},
	{
		key: 'score',
		label: t('Score'),
		sortable: true,
		render: (_: any, row: any) => h('span', {}, row.score ?? 0),
	},
	{
		key: 'cost',
		label: t('Cost'),
		sortable: true,
		render: (_: any, row: any) => h('span', {}, parseFloat(row.cost ?? 0).toFixed(2)),
	},
	{
		key: 'status',
		label: t('Status'),
		sortable: true,
		render: (_: any, row: any) => h(StatusBadgeLeads, { status: row.status }),
	},
	{
		key: 'created_at',
		label: t('Created'),
		sortable: true,
		render: (date: string, row: any) =>
			h('div', { class: 'text-muted-foreground text-xs flex flex-col gap-0.5' }, [
				h('span', formatDate(date)),
				row.deleted_at
					? h(
							'span',
							{ class: 'text-destructive font-medium' },
							`${formatDate(row.deleted_at)}`,
						)
					: null,
			]),
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
