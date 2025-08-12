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
// import { localCities } from '@/localData/cities.js'
import { useMapClick } from '@/composables/useMapClick.js'

const forms = [ 'EditRegionForm', 'AddCityForm', 'AddShopForm']

defineEmits(['closeModal', 'updateRegions', 'addCity'])

// const forms = {
//   EditRegionForm: 'Контактные данные',
//   AddCityForm: 'Введите данные адреса'
// }

let isDialogOpen = ref(false)
let mode = ref('editRegion')

// editRegion
// defineCoords

// const cities = reactive(localCities)
const regions = reactive(localRegions)
const cities = regions.map(el => el.cities)


let x = ref(0) 
let y = ref(0) 

const currentRegionArea = ref({})
const currentModal = ref(forms[0])

const { clickCity, currentRegion, currentCity, isTooltip, tooltipY, tooltipX } = useMapClick()

const addShop = () => {
  openDialog('AddShopForm')
  const region = regions.find(region => region.id === currentRegion.value.id)
  console.log(region)
  const foundCity = region.cities.find(city => city.id === currentCity.value.id)
  foundCity.shops.push(
    {
      id: 23,
      name: 'магазин 132',
      address: 'ул. Якутская, 12',
      phone: '79564214531',
      email: 'yak@mail.ru',
    }
  )
}

const openDialog = (formName) => {
  currentModal.value = formName
  isDialogOpen.value = true
}

const clickRegion = (region, event) => {
  if (isTooltip.value) return
  currentRegionArea.value = region
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

const cancelDefineСoordinates = () => {
  mode.value = 'editRegion'
}

const addCity = (formData) => {
  const { name, x, y } = formData
  currentRegionArea.value.cities.push({
    id: 111,
    name,
    x,
    y,
    countryName: 'Russian Federation',
    regionName: currentRegionArea.value.regionName,
    fill: '#FFFF00',
    hidden: false,
    countryId: currentRegionArea.value.id,
  })
  isDialogOpen.value = false
  mode.value = 'editRegion'
}

const closeDialog = () => {
  isDialogOpen.value = false
}

const updateRegions = (formData) => {
  console.log('updateRegions !!!')
  const { hex } = formData
  currentRegionArea.value.paths.map(p => p.fill = hex)

}

</script>

<template>
  <v-btn
    color="primary"
    class="ms-auto"
    text="Добавить новый город"
    @click="defineСoordinates"
  ></v-btn>
  <v-btn
    class="ms-auto"
    text="отмена"
    @click="cancelDefineСoordinates"
    v-if="mode === 'defineCoords'"
  ></v-btn>

  <creator-map
    :regions="regions"
    :mode="mode"
    @clickCity="clickCity"
    @clickRegion="clickRegion"
  ></creator-map>

  <Tooltip
    v-if="isTooltip"
    :tooltipY="tooltipY"
    :tooltipX="tooltipX"
    :currentCity="currentCity"
    @addShop="addShop"
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
    :region="currentRegionArea"
    @updateRegions="updateRegions"
    @addCity="addCity"
  ></BaseDialog>
</template>
