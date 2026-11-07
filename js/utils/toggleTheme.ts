import type { Ref } from 'vue';

export function toggleTheme(mode: Ref) {
    const el = document.querySelector('body');
    mode.value = !mode.value;
    if (el) {
        mode.value ? el.classList.add('dark') : el.classList.remove('dark');
    }
}
