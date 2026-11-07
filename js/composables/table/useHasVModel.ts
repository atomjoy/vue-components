import { getCurrentInstance, computed, type ComputedRef } from 'vue'

/**
 * Sprawdza, czy rodzic przekazał v-model do komponentu.
 * @param modelName Opcjonalna nazwa v-modelu (domyślnie 'modelValue')
 */
export function useHasVModel(modelName: string = 'modelValue'): ComputedRef<boolean> {
	const instance = getCurrentInstance()

	if (!instance) {
		console.warn('useHasVModel musi być wywołane wewnątrz <script setup> lub funkcji setup()!')
	}

	return computed(() => {
		const rawProps = instance?.vnode.props || {}
		return modelName in rawProps
	})
}
