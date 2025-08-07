<script setup>
import { ref, reactive } from 'vue'

import CreatorMap from './CreatorMap.vue'
import Tooltip from './Tooltip.vue'
// import BaseModal from './BaseModal.vue'
// import MyDialog from './MyDialog.vue'
// import MyDialogII from './MyDialogII.vue'
// import BaseForm from './BaseForm.vue'
import BaseDialog from './BaseDialog.vue'

import { localRegions } from '@/localData/regions.js'
import { localCities } from '@/localData/cities.js'
import { useMapClick } from '@/composables/useMapClick.js'

const forms = [ 'EditRegionForm', 'AddCityForm']

defineEmits(['closeModal', 'updateRegions', 'addCity'])

// const forms = {
//   EditRegionForm: 'Контактные данные',
//   AddCityForm: 'Введите данные адреса'
// }

let mode = ref('editRegion')

// editRegion
// defineCoords

const cities = reactive(localCities)
const regions = reactive(localRegions)

let x = ref(0) 
let y = ref(0) 

const currentRegion = ref({})
const currentModal = ref(forms[0])

const { clickCircle, currentCity, isTooltip, tooltipY, tooltipX } = useMapClick()

const addRepresentation = () => {
    console.log('addRepresentation')
    console.log(currentCity.value)
    const foundCity = cities.find(city => city.id === currentCity.value.id)
    foundCity.representations.push(
        {
            id: 23,
            name: 'в/ч 1212',
            address: 'ул. Якутская, 12',
            phone: '79564214531',
            email: 'yak@mail.ru',
        }
    )
}

const clickRegion = (region, event) => {
  currentRegion.value = region
  if (mode.value === 'defineCoords') {
    console.log('mode:', mode)
    const svgMap = document.getElementById('svg-map')
    const pt = svgMap.createSVGPoint()
    pt.x = event.clientX
    pt.y = event.clientY
    const svgP = pt.matrixTransform( svgMap.getScreenCTM().inverse() )
    x.value = Math.round(svgP.x)
    y.value = Math.round(svgP.y)
    openCreateCityDialog()
    return 
  }
  console.log('далее, открыть модалку')
  currentModal.value = forms[0]
  isDialogOpen.value = true
}

const openCreateCityDialog = () => {
  currentModal.value = forms[1]
  isDialogOpen.value = true
}

const defineСoordinates = () => {
  mode.value = 'defineCoords'
}

const addCity = (formData) => {
  const { name, x, y } = formData
  currentRegion.value.cities.push({
    id: 111,
    name,
    x,
    y,
    countryName: 'Russian Federation',
    regionName: currentRegion.value.regionName,
    fill: '#FFFF00',
    hidden: false,
    countryId: currentRegion.value.id,
  })
  isDialogOpen.value = false
}

const closeDialog = () => {
  isDialogOpen.value = false
}

const updateRegions = (formData) => {
  console.log(formData)
  const { hex } = formData
  console.log(hex)
  currentRegion.value.paths.map(p => p.fill = hex)
}

let isDialogOpen = ref(false)

</script>

<template>
  <v-btn
    class="ms-auto"
    text="Добавить новый город"
    @click="defineСoordinates"
  ></v-btn>

  <creator-map
    :regions="regions"
    :cities="cities"
    @clickCircle="clickCircle"
    @clickRegion="clickRegion"
  ></creator-map>

  <Tooltip
    v-if="isTooltip"
    :tooltipY="tooltipY"
    :tooltipX="tooltipX"
    :currentCity="currentCity"
    @addRepresentation="addRepresentation"
    @closeTooltip="isTooltip = false"
  ></Tooltip>

  <!-- <MyDialog
      :title="dialogTitle"
      :message="dialogMessage"
      :show-dialog="showDialog"
    /> -->

  <BaseDialog
    :value="isDialogOpen"
    :nameForm="currentModal"
    :x="x"
    :y="y"
    @closeDialog="closeDialog"
    :region="currentRegion"
    @updateRegions="updateRegions"
    @addCity="addCity"
  ></BaseDialog>
</template>
