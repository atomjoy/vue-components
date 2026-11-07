import { router } from '@inertiajs/vue3'

/*
// Trzeba skonfigurować GTM odpowiednio w panelu !!!

// Na górze pliku app.ts
import { setupAnalytics } from '@/utils/loadGTM'

// ... reszta Twojego kodu Inertia (createInertiaApp itp.) ...

// Wywołujesz na dole pliku app.ts
setupAnalytics()
*/

/**
 * Inicjalizuje śledzenie wirtualnych odsłon (Virtual Pageviews) dla GTM oraz GA4
 * reagując na nawigację w aplikacji Inertia.js.
 */
export function setupAnalytics(): void {
	router.on('navigate', (event) => {
		// Opóźnienie 50ms, aby komponent <Head> zdążył zaktualizować tag <title>
		setTimeout(() => {
			const currentUrl = window.location.href
			const currentTitle = document.title

			// From cookie banner
			const savedConsent = localStorage.getItem('cookie_consent')
			const consentStatus = savedConsent === 'accepted' ? 'granted' : 'denied'

			// GTM (Google Tag Manager)
			window.dataLayer = window.dataLayer || []
			window.dataLayer.push({
				event: 'virtual_pageview',
				page_location: currentUrl,
				page_title: currentTitle,
				cookie_consent_status: consentStatus,
			})

			// GA4 (gtag.js)
			if (typeof window.gtag === 'function') {
				window.gtag('event', 'page_view', {
					page_location: currentUrl,
					page_title: currentTitle,
					page_referrer: event.detail.page.props.referrer || document.referrer,
				})
			}
		}, 50)
	})
}
