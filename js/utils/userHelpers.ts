export interface MarketingParams {
	utm_source: string | null
	utm_campaign: string | null
	utm_medium: string | null
	utm_term: string | null
	utm_content: string | null
}

export interface MarketingParamsAll {
	// Standardowe GA4
	utm_source: string
	utm_medium: string | null
	utm_campaign: string | null
	utm_term: string | null
	utm_content: string | null

	// Nowe GA4
	utm_id: string | null
	utm_source_platform: string | null

	// Auto-tagging
	epik: string | null
	gclid: string | null
	fbclid: string | null
	ttclid: string | null
	msclkid: string | null
	li_fat_id: string | null
}

export const getAvatarFallback = (name: string): string =>
	name ? name.substring(0, 2).toUpperCase() : 'UN'

export const formatDate = (dateString: string) => {
	if (!dateString) return ''
	const date = new Date(dateString)
	if (isNaN(date.getTime())) return dateString
	// Format natywnie zwraca format 26 mar 2026
	return date.toLocaleDateString('pl-PL', {
		year: 'numeric',
		month: 'short',
		day: 'numeric',
	})
}

export const formatDateShort = (dateString: string) => {
	if (!dateString) return ''
	const date = new Date(dateString)
	if (isNaN(date.getTime())) return dateString
	// Format natywnie zwraca format YYYY-MM-DD
	return new Intl.DateTimeFormat('pl-PL').format(date)
}

export const formatDateTime = (dateString: string) => {
	if (!dateString) return ''
	const date = new Date(dateString)
	if (isNaN(date.getTime())) return dateString
	// Format natywnie zwraca format 26 mar 2026, 11:33
	return date.toLocaleDateString('pl-PL', {
		year: 'numeric',
		month: 'short',
		day: 'numeric',
		hour: '2-digit',
		minute: '2-digit',
	})
}

export const formatStatus = (status: string) => {
	const statuses: Record<string, string> = {
		draft: 'Szkic',
		archived: 'Archiwum',
		published: 'Opublikowany',
	}
	return statuses[status] || status
}

export const generateChartSvgPoints = (key: 'pageviews' | 'unique_users', props: any): string => {
	if (!props.chartData.length) return ''
	const values = props.chartData.map((d: any) => d[key])
	const max = Math.max(...values, 1)
	return props.chartData
		.map((data: any, index: number) => {
			const x = (index / (props.chartData.length - 1)) * 100
			const y = 100 - (data[key] / max) * 100
			return `${x},${y}`
		})
		.join(' ')
}

export const getQueryParams = (): Record<string, string> => {
	if (typeof window === 'undefined') return {}
	const params = new URLSearchParams(window.location.search)
	const obj: Record<string, string> = {}
	params.forEach((value, key) => {
		obj[key] = value
	})
	return obj
}

export const formatUtmKey = (key: string): string => {
	return key.replace('utm_', '').replace('_', ' ').replace('.', ' ')
}

export const getMarketingParams = (): MarketingParams => {
	if (typeof window === 'undefined') {
		return {
			utm_source: 'website',
			utm_campaign: null,
			utm_medium: null,
			utm_term: null,
			utm_content: null,
		}
	}
	const params = new URLSearchParams(window.location.search)

	return {
		utm_source: params.get('utm_source') ?? 'website',
		utm_campaign: params.get('utm_campaign') ?? null,
		utm_medium: params.get('utm_medium') ?? null,
		utm_term: params.get('utm_term') ?? null,
		utm_content: params.get('utm_content') ?? null,
	}
}
