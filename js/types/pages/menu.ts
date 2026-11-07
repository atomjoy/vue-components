export interface AssociatedPage {
	id: number
	slug: string
}

export interface MenuItem {
	id: number
	label: string
	location: 'header' | 'footer'
	page_id: number | null
	url: string | null
	parent_id: number | null
	sort_order: number
	page: AssociatedPage | null
	children: MenuItem[] // Rekurencyjne typowanie dla sub-menu
}

export interface SharedMenuProps {
	headerMenu: MenuItem[]
	footerMenu: MenuItem[]
}
