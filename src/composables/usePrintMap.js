import { ref } from 'vue'

export function usePrintMap() {

    const regionHover = ref()
    const regionName = ref()

    const printRegion = (item) => {
        regionHover.value = item.id
        regionName.value = item.regionName
    }

    const clearPrintRegion = () => {
        regionHover.value = -1
    }

    return {
        printRegion,
        clearPrintRegion,
        regionHover
    }
}
