import { removeSchema } from '@/utils/removeSchema'

// Load schemas to head
export function loadSchemaString(json: string = '[]', clear = true, minLength: number = 20) {
	// Remove all sechmas
	if (clear) {
		removeSchema()
	}

	// Load new
	if (json.length > minLength) {
		const s = document.createElement('script')
		s.setAttribute('type', 'application/ld+json')
		s.textContent = json
		document.head.appendChild(s)
	}
}
