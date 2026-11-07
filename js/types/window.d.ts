export {} // Ensures the file is treated as a module

declare global {
	interface Window {
		dataLayer: any[]
		gtag?: (...args: any[]) => void
	}
}

declare function gtag(...args: any[]): void
