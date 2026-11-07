// Imports
import { router } from '@inertiajs/vue3'
import {
	ref,
	watch,
	toValue,
	type Ref,
	type MaybeRefOrGetter,
	type Component,
	type VNode,
} from 'vue'

// Helpers

export let searchTimeout: ReturnType<typeof setTimeout>

// Functions

/**
 * Table selected checkbox
 */
export const checkIsAllSelected = (rawRows: Identifiable[], selectedIds: (string | number)[]) => {
	if (rawRows.length === 0) return false
	return rawRows.every((item) => selectedIds.includes(item.id))
}

/**
 * Update server data and page url
 */
export function updateTableData(baseRoute: string, data: any) {
	const cleanParams = getParamsClean(data)

	router.get(baseRoute, cleanParams, {
		preserveState: true,
		preserveScroll: true,
		replace: true,
	})
}

/**
 * Funkcja obserwująca stan filtrów/tabeli
 * @param {Ref} tableState - Reaktywny obiekt tableState z Vue
 * @param {Function} callback - Funkcja wywoływana przy każdej zmianie (dla search z debouncem)
 */
export function tableStateWatcher(tableState: Ref<TableState>, callback: () => void) {
	watch(
		// Klonuje czysty obiekt (deep clone) dla debouncer (inaczej nie dziła)
		// () => JSON.parse(JSON.stringify(tableState.value)),
		() => Object.assign({}, tableState.value),
		(newState, oldState, onCleanup) => {
			if (newState.search !== oldState?.search) {
				const searchTimeout = setTimeout(() => {
					console.log('Watch search:', newState.search)
					tableState.value.page = 1
					callback()
				}, 400)

				onCleanup(() => clearTimeout(searchTimeout))
			} else {
				console.log('Watch filtry:', newState)
				tableState.value.page = 1
				callback()
			}
		},
		{ deep: true, immediate: false },
	)
}

/**
 * Uniwersalna funkcja czyszcząca obiekt z pustych wartości (null, undefined, '', []).
 * Przyjmuje T i zwraca obiekt z opcjonalnymi wartościami (Partial).
 */
export function getParamsClean<T extends Record<string, any>>(
	data: MaybeRefOrGetter<T>,
): Partial<T> {
	const rawData = toValue(data)

	return Object.fromEntries(
		Object.entries(rawData).filter(([_, value]) => {
			if (Array.isArray(value)) {
				return value.length > 0
			}
			return value !== null && value !== undefined && value !== ''
		}),
	) as Partial<T>
}

/**
 * Funkcja do inicjalizacji tableState z props.filters
 */
export function updateStateClean<T extends Record<string, any>, K extends Record<string, any>>(
	tableState: Ref<T>,
	filters: K,
): void {
	tableState.value = {
		...tableState.value,
		...getParamsClean(filters),
	} as T
}

/**
 * Wyciąga wartości z parametrów url 'paramName[1]=...'
 * @param paramName Nazwa parametru bazowego (np. 'roles')
 */
export function getUrlParamsArray(paramName: string = 'roles'): Ref<string[]> {
	const urlParams = new URLSearchParams(window.location.search)
	const prefix = `${paramName}[`

	const initialArray = Array.from(urlParams.entries())
		.filter(([key]) => key.startsWith(prefix))
		.map(([_, value]) => value)

	return ref<string[]>(initialArray)
}

/**
 * Wyciąga wartości z parametrów url 'paramName[1]=...'
 * @param paramName Nazwa parametru bazowego (np. 'roles')
 */
export function useUrlArray(paramName: string = 'roles'): Ref<string[]> {
	const urlParams = new URLSearchParams(window.location.search)
	const prefix = `${paramName}[`

	const initialArray = Array.from(urlParams.entries())
		.filter(([key]) => key.startsWith(prefix))
		.map(([_, value]) => value)

	return ref<string[]>(initialArray)
}

// Functions columns

// Funkcja obsługująca kliknięcie głównego checkboxa w nagłówku
export const toggleAll = (
	isAllSelected: Ref<boolean>,
	selectedIds: Ref<Array<number>>,
	rows: Ref<any>,
) => {
	if (isAllSelected.value) {
		const rowIds = rows.value.map((row: any) => row.id)
		selectedIds.value = selectedIds.value.filter((id: any) => !rowIds.includes(id))
	} else {
		rows.value.forEach((row: any) => {
			if (!selectedIds.value.includes(row.id)) {
				selectedIds.value.push(row.id)
			}
		})
	}
}

// Funkcja obsługująca pojedynczy checkbox w wierszu
export const toggleRow = (id: number, selectedIds: Ref<Array<number>>) => {
	const index = selectedIds.value.indexOf(id)
	if (index > -1) {
		selectedIds.value.splice(index, 1)
	} else {
		selectedIds.value.push(id)
	}
}

// Types

export interface Identifiable {
	id: number
}

export interface StatusOption {
	value: string
	label: string
	count: number
}

export interface Role {
	id: number
	name: string
	guard_name: string
	created_at?: string
	updated_at?: string
}

export interface Permissions {
	id: number
	name: string
	guard_name: string
	created_at?: string
	updated_at?: string
}

export interface User {
	id: number
	name: string
	email: string
	email_verified_at: string | null
	created_at: string
	updated_at: string
	two_factor_confirmed_at: string | null
	roles: Role[]
	permissions: Permissions[]
	avatar: string
}

export interface PaginationLink {
	url: string | null
	label: string
	active: boolean
}

export interface LaravelPaginationPayload<T = any> {
	current_page: number
	data: T[]
	first_page_url: string
	from: number
	last_page: number
	last_page_url: string
	links: PaginationLink[]
	next_page_url: string | null
	path: string
	per_page: number
	prev_page_url: string | null
	to: number
	total: number
}

export interface StatusFilterOption {
	value: string
	label: string
	count: number
}

// Type reprezentuje czystą tablicę
export type SelectedRoles = number[] | string[] | StatusFilterOption[]

// Tu znaki zapytania co by się linter w tableState nie czepiał!
export interface TableFilters {
	page?: number
	per_page?: number
	search?: string
	sort_by?: 'id' | 'name' | 'email' | 'title' | 'created_at' | 'filter_2fa' | 'filter_verified'
	sort_dir?: 'asc' | 'desc'
	date_from?: string // Format YYYY-MM-DD
	date_to?: string // Format YYYY-MM-DD
	filter_verified?: string | boolean
	filter_2fa?: string | boolean
	roles?: SelectedRoles
	[key: string]: any
}

export interface TableState extends TableFilters {
	[key: string]: any
}

// Columns
export interface ColumnOptions {
	basePath: string
	selectedIds: Ref<Array<number>>
	isAllSelected: Ref<boolean>
	rows: Ref<any>
}

export interface TableColumn {
	key: string
	label: string
	sortable?: boolean
	render?: (value: any, row: User) => VNode | Component | string | number
}

export interface CustomHtmlPage {
	slug: string
	title: string
	link_name: string
	description: string
	content: string
	show_footer: boolean
	show_menu: boolean
	show_form: boolean
	header: boolean
	footer: boolean
}
