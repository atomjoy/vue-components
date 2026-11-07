import ActionsDropdown from '@/components/table/dropdowns/ActionsDropdown.vue'
import CheckboxCell from '@/components/table/buttons/CheckboxCell.vue'
import { h } from 'vue'
import { i18n } from '@/i18n'
import { formatDate } from '@/utils/userHelpers'
import { User, ColumnOptions, TableColumn, toggleAll, toggleRow } from '@/types/pages'
import AvatarImage from '@/components/table/AvatarImage.vue'

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
		render: (_: any, row: any) =>
			h(AvatarImage, { image: row.image, name: row.name }, { defaults: () => [] }),
	},
	// {
	// 	key: 'image',
	// 	label: t('Image'),
	// 	sortable: true,
	// 	render: (_: any, row: any) =>
	// 		row.image
	// 			? h(
	// 					'a',
	// 					{ href: row.image ?? '', target: '_blank', class: 'hover:text-custom' },
	// 					h('img', {
	// 						src: row.image ?? '',
	// 						class: 'h-12 w-12 object-cover rounded-full',
	// 					}),
	// 				)
	// 			: '',
	// },
	{
		key: 'name',
		label: t('Name'),
		sortable: true,
		render: (_: any, row: any) => h('span', {}, row.name),
	},
	{
		key: 'email',
		label: t('Email'),
		sortable: true,
		render: (_: any, row: any) =>
			h('div', { class: 'flex flex-col' }, [
				h('a', { href: 'mailto:' + row.email, class: 'hover:text-custom mb-1' }, row.email),
				h('a', { href: 'tel:' + row.phone, class: 'hover:text-custom' }, row.phone),
			]),
	},
	// {
	// 	key: 'phone',
	// 	label: t('Phone'),
	// 	sortable: true,
	// 	render: (_: any, row: any) => h('a', { href: 'tel:' + row.phone }, row.phone),
	// },
	{
		key: 'position',
		label: t('Position'),
		sortable: true,
		render: (_: any, row: any) => h('span', {}, row.position),
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
