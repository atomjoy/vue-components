import { removeSchema } from './removeSchema'

// Load schemas to head
export async function loadSchema(
	file: string = '/schema/website.json',
	clear = true,
	minLength: number = 20,
) {
	// Remove all sechmas
	if (clear) {
		removeSchema()
	}

	// Load new
	try {
		const response = await fetch(file)
		if (!response.ok) {
			throw new Error(`Response status: ${response.status}`)
		}
		const txt = await response.text()
		if (txt.length > minLength) {
			const s = document.createElement('script')
			s.setAttribute('type', 'application/ld+json')
			s.textContent = txt
			document.head.appendChild(s)
		}
	} catch (err: any) {
		console.error('loadSchema', err.message)
	}
}
