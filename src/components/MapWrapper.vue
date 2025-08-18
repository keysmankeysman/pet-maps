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
import { useMapClick } from '@/composables/useMapClick.js'

const forms = [ 'EditRegionForm', 'AddCityForm', 'AddShopForm', 'AddEmployeerForm', 'EditCityForm']

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

const handleAddShop = () => {
  openDialog('AddShopForm')
}

const handleEditCity = () => {
  openDialog('EditCityForm')
}

const handleAddEmployee = () => {
  openDialog('AddEmployeerForm')
}

const addShop = (formData) => {
  const { name, address, neededEmployees } = formData
  console.log('addShop', name, address)
  const region = regions.find(region => region.id === currentRegion.value.id)
  const foundCity = region.cities.find(city => city.id === currentCity.value.id)
  
  // теперь у найденного города, нужно пробежаться по всем shops и найти кол-во сотрудников
  console.log('foundCity', foundCity)
  
  let countEmployee = 0
  foundCity.shops.forEach(shop => {
    if (shop.employees.length > 0) {
      countEmployee += shop.employees.length
    }
  })
  console.log('кол-во представителей: ', countEmployee)

  // const shopInTheCity = region.cities.find(city => city.id === currentCity.value.id)
  foundCity.shops.push(
    {
      id: 23,
      name,
      address,
      neededEmployees,
      countEmployee: 0,
    }
  )
  
  if (countEmployee > 2) {
    fillCircleCity(foundCity, '#008000')
  } else {
    fillCircleCity(foundCity, '#FF0033')
  }



  // red - #FF0033 - в городе нет сотрудников
  // yellow - #FFFF00 - сотрудников не достаточно
  // green - #008000 - сотрудников достаточно

}

const fillCircleCity = (city, color) => {
  city.fill = color
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
    fill: '#000000',
    hidden: false,
    countryId: currentRegionArea.value.id,
    shops: []
  })
  isDialogOpen.value = false
  mode.value = 'editRegion'
}

const openDialog = (formName) => {
  currentModal.value = formName
  isDialogOpen.value = true
}

const closeDialog = () => {
  isDialogOpen.value = false
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

const updateRegions = (formData) => {
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
    @handleAddShop="handleAddShop"
    @handleAddEmployee="handleAddEmployee"
    @editTooltip="handleEditCity"
    @closeTooltip="isTooltip = false"
  ></Tooltip>

  <BaseDialog
    :value="isDialogOpen"
    :nameForm="currentModal"
    :x="x"
    :y="y"
    :region="currentRegionArea"
    :city="currentCity"
    @updateRegions="updateRegions"
    @addCity="addCity"
    @addShop="addShop"
    @closeDialog="closeDialog"
  ></BaseDialog>
</template>
