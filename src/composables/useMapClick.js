import { ref } from 'vue'

export function useMapClick() {

    let currentCity = ref({})
    let isTooltip = ref(false)

    const tooltipX = ref()
    const tooltipY = ref()

    const clickCircle = (obj) => {
        const { city, $event } = obj
        const event = $event
        isTooltip.value = true

        if (event.offsetY < 50) {
            tooltipX.value = event.offsetY - 15
        } else if (event.offsetY < 450) {
            tooltipX.value = event.offsetY - 55
        } else if (event.offsetY < 650) {
            tooltipX.value = event.offsetY - 105
        } else if (event.offsetY < 750) {
            tooltipX.value = event.offsetY - 165
        }

        tooltipY.value = event.offsetX + 20

        currentCity.value = city
    }

    return {
        clickCircle,
        currentCity,
        isTooltip,
        tooltipX,
        tooltipY
    }
}
