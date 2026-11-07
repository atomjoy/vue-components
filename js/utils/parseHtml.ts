// Close html tags
export const cleanHtml = (html: string) => {
	const rawHtml = html || ''
	if (!rawHtml) return ''

	const parser = new DOMParser()
	const doc = parser.parseFromString(rawHtml, 'text/html')

	// doc.body.innerHTML zawiera już automatycznie domknięte i naprawione tagi
	return doc.body.innerHTML
}

// Czyszczenie <main></main> tags
export const cleanMainHtml = (html: any) => {
	const rawHtml = html || ''
	if (!rawHtml) return ''

	const parser = new DOMParser()
	const doc = parser.parseFromString(rawHtml, 'text/html')

	// Szukamy wszystkich tagów <main> wewnątrz przesłanego kodu
	const mainElements = doc.querySelectorAll('main')

	// Zamieniamy każdy tag <main> na zwykły <div>, zachowując jego klasy, style i zawartość
	mainElements.forEach((mainTag) => {
		const divTag = doc.createElement('div')

		// Kopiujemy wszystkie atrybuty (id, class, style itp.)
		Array.from(mainTag.attributes).forEach((attr) => divTag.setAttribute(attr.name, attr.value))

		// Przenosimy całą zawartość ze środka tagu <main> do nowego <div>
		while (mainTag.firstChild) {
			divTag.appendChild(mainTag.firstChild)
		}

		// Podmieniamy stary element na nowy w strukturze dokumentu
		mainTag.parentNode?.replaceChild(divTag, mainTag)
	})

	// Zwracamy czysty kod HTML jako string gotowy dla v-html
	return doc.body.innerHTML
}
