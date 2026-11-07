import ActionsDropdown from '@/components/table/dropdowns/ActionsDropdown.vue'
import StatusBadgeArticle from '@/components/table/buttons/StatusBadgeArticle.vue'
import CheckboxCell from '@/components/table/buttons/CheckboxCell.vue'
import { h } from 'vue'
import { i18n } from '@/i18n'
import { BookDashed } from '@lucide/vue'
import { formatDate } from '@/utils/userHelpers'
import { User, ColumnOptions, TableColumn, toggleAll, toggleRow } from '@/types/pages'
import ShowImage from '@/components/table/ShowImage.vue'

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
		key: 'image',
		label: t('Image'),
		sortable: true,
		render: (_: any, row: any) => h(ShowImage, { row: row }),
	},
	{
		key: 'title',
		label: t('Title'),
		sortable: true,
		render: (_: any, row: any) =>
			h('span', {}, [
				h(
					'a',
					{
						href: '/admin/articles/' + row.id,
						class: 'hover:text-custom text-sm',
						target: '_blank',
					},
					row.title,
				),
				h(
					'span',
					{
						style: { '--cat-color': row?.category?.color ?? '#000000' },
						class: 'text-[var(--cat-color)] font-semibold',
						title: 'Category',
					},
					row.category?.name ? `(${row.category?.name})` : '',
				),
			]),
	},
	{
		key: 'author',
		label: t('Author'),
		sortable: true,
		render: (_: any, row: any) =>
			row?.author
				? h(
						'a',
						{
							href: '/author/' + row?.author?.id,
							target: '_blank',
							class: 'hover:text-custom text-sm',
						},
						row?.author?.name,
					)
				: '',
	},
	{
		key: 'status',
		label: t('Status'),
		sortable: true,
		render: (_: any, row: any) => h(StatusBadgeArticle, { status: row.status }),
	},
	{
		key: 'created_at',
		label: t('Created'),
		sortable: true,
		render: (date: string) =>
			h('span', { class: 'text-muted-foreground text-xs' }, formatDate(date)),
	},
	{
		key: 'published_at',
		label: t('Published'),
		sortable: true,
		render: (date: string | null) => {
			return Boolean(date)
				? h('span', { class: 'h-4 w-4 text-green-500 text-xs' }, formatDate(String(date)))
				: h(BookDashed, { class: 'h-4 w-4 text-red-500' })
		},
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
