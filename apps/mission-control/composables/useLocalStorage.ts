import { ref, Ref, UnwrapRef } from "vue"

export function useLocalStorage<T>(key: string, initialValue: UnwrapRef<T>): {
    savedData: Ref<UnwrapRef<T>>
    saveData: (value: UnwrapRef<T>) => void
    clearData: () => void
} {
    const storedData = localStorage.getItem(key)
    const parsedData = storedData ? JSON.parse(storedData) : initialValue
    const savedData: Ref<UnwrapRef<T>> = ref(parsedData) as Ref<UnwrapRef<T>>

    // Save data to localStorage and update the reactive variable
    const saveData = (value: UnwrapRef<T>) => {
        savedData.value = value
        localStorage.setItem(key, JSON.stringify(value))
    }

    // Clear data from localStorage and reset the reactive variable if we want to clear data, no clue if we are gonna do it :D
    const clearData = () => {
        savedData.value = initialValue
        localStorage.removeItem(key)
    }

    return {
        savedData,
        saveData,
        clearData,
    }
}
