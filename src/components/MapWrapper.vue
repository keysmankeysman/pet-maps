<script setup>
import { ref, reactive } from 'vue'
import { eventBus } from '../eventBus'
import { onMounted, onUnmounted } from 'vue'

import CreatorMap from './CreatorMap.vue'
import Tooltip from './Tooltip.vue'
import BaseDialog from './BaseDialog.vue'

import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

defineEmits(['closeModal', 'updateRegions', 'addCity', 'updateEmployeer', 'updateCity'])

onMounted(() => {
  eventBus.on('enable-define-coords', defineСoordinates)
  eventBus.on('disable-define-coords', cancelDefineСoordinates)
})
onUnmounted(() => {
  eventBus.off('enable-define-coords', defineСoordinates)
  eventBus.off('disable-define-coords', cancelDefineСoordinates)
})

import { localRegions } from '@/localData/regions.js'
import { useMapClick } from '@/composables/useMapClick.js'

const forms = [
  { name: 'EditRegionForm', translation: 'Редактировать регион' },
  { name: 'AddCityForm', translation: 'Создать город' },
  { name: 'AddShopForm', translation: 'Новый магазин' },
  { name: 'AddEmployeerForm', translation: 'Добавить сотрудника' },
  { name: 'EditCityForm', translation: 'Редактирование города' },
  { name: 'EditEmployeerForm', translation: 'Редактирование сотрудника' },
]

const employeeStatusColors = {
  red: '#FF0033', // в городе нет сотрудников
  yellow: '#FFFF00', // сотрудников не достаточно
  green: '#008000', // сотрудников достаточно
}

let isDialogOpen = ref(false)
let mode = ref('editRegion')

const regions = reactive(localRegions)

let x = ref(0) 
let y = ref(0) 

// const currentRegion = ref({})
const currentForm = ref(forms[0])
const currentShop = ref({})

const { clickCity, currentRegion, currentCity, isTooltip, tooltipY, tooltipX } = useMapClick()

const handleAddShop = () => {
  openDialog(forms[2])
}

const handleEditCity = () => {
  openDialog(forms[4])
}

const handleAddEmployee = () => {
  openDialog(forms[3])
}

const handleEditEmployee = (shop) => {
  currentShop.value = shop
  openDialog(forms[5])
}

const addShop = (formData) => {
  const { name, address, neededEmployees } = formData
  const region = regions.find(region => region.id === currentRegion.value.id)
  const foundCity = region.cities.find(city => city.id === currentCity.value.id)
  
  let countEmployee = 0
  foundCity.shops.forEach(shop => {
    if (shop.employees.length > 0) {
      countEmployee += shop.employees.length
    }
  })
  foundCity.shops.push(
    {
      id: 23,
      name,
      address,
      neededEmployees,
      countEmployee: 0,
      employees: []
    }
  )
  
  fillCircleCity()
  toastView('Магазин добавлен')
}

const fillCircleCity = () => {
  if (!currentCity.value) return
  
  currentCity.value.shops.forEach(el => {

    if (el.countEmployee === 0) {
      currentCity.value.fill = employeeStatusColors.red
    } else if (el.countEmployee < el.neededEmployees) {
      currentCity.value.fill = employeeStatusColors.yellow
    } else {
      currentCity.value.fill = employeeStatusColors.green
    }
  })
}


const addCity = (formData) => {
  const { cityName, x, y } = formData
  currentRegion.value.cities.push({
    id: 111,
    name: cityName,
    x,
    y,
    countryName: 'Russian Federation',
    regionName: currentRegion.value.regionName,
    fill: '#000000',
    hidden: false,
    countryId: currentRegion.value.id,
    shops: []
  })
  isDialogOpen.value = false
  mode.value = 'editRegion'
  toastView(`Город ${name} добавлен`)
}

const closeDialog = () => {
  isDialogOpen.value = false
}

const clickRegion = (region, event) => {
  if (isTooltip.value) return
  currentRegion.value = region
  if (mode.value === 'defineCoords') {
    const svgMap = document.getElementById('svg-map')
    const pt = svgMap.createSVGPoint()
    pt.x = event.clientX
    pt.y = event.clientY
    const svgP = pt.matrixTransform( svgMap.getScreenCTM().inverse() )
    x.value = Math.round(svgP.x)
    y.value = Math.round(svgP.y)
    openDialog(forms[1])
    return 
  } else {
    openDialog(forms[0])
  }
}

const defineСoordinates = () => {
  mode.value = 'defineCoords'
}

const cancelDefineСoordinates = () => {
  mode.value = 'editRegion'
}

const toastView = (text) => {
  toast(text, {
    autoClose: 2000,
  })
}

const updateCity = (formData) => {
  currentCity.value = formData
}

const updateEmployeer = (formData) => {
  const employees = formData.formData
  currentShop.value.employees = employees
  currentShop.value.countEmployee = employees.length

  fillCircleCity()
  toastView(`Данные сотрудников магазина ${currentShop.value.name} обновлены`)
}

const updateRegions = (formData) => {
  const { hex, region } = formData
  currentRegion.value = region
  currentRegion.value.paths.map(p => p.fill = hex)
  currentRegion.value.color = hex
  console.log(currentRegion.value)
  toastView(`Регион ${currentRegion.value.regionName} обновлен`)
}

const openDialog = (formName) => {
  currentForm.value = formName
  isDialogOpen.value = true
}

</script>

<template>


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
    @handleEditEmployee="handleEditEmployee"
    @editTooltip="handleEditCity"
    @closeTooltip="isTooltip = false"
  ></Tooltip>

  <BaseDialog
    :value="isDialogOpen"
    :currentForm="currentForm"
    :x="x"
    :y="y"
    :region="currentRegion"
    :city="currentCity"
    :shop="currentShop"
    @updateRegions="updateRegions"
    @updateEmployeer="updateEmployeer"
    @updateCity="updateCity"
    @addCity="addCity"
    @addShop="addShop"
    @closeDialog="closeDialog"
  ></BaseDialog>
</template>
