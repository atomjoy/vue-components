import Splide from '@splidejs/splide'

/*
// app.css
@import '@splidejs/splide/css';

// In component with code don't run twice
onMounted(() => {
    loadSplide()
})
*/
export async function loadSplide() {
	if (document.querySelectorAll('.splide').length > 0) {
		// @ts-ignore
		setTimeout(() => {
			let spl = new Splide('.splide', { type: 'loop' })
			if (spl) {
				spl.mount()
			}
		}, 1000)
	}
}
