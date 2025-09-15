<script setup>
import { ref } from 'vue'

import BaseDialog from './BaseDialog.vue'

defineEmits(['closeDialog', 'addCity', 'updateCity'])

const forms = [
  { name: 'EditRegionForm', translation: 'Редактирование регион' },
  { name: 'AddCityForm', translation: 'Создать город' },
  { name: 'AddShopForm', translation: 'Новый магазин' },
  { name: 'AddEmployeerForm', translation: 'Добавить сотрудника' },
  { name: 'EditCityForm', translation: 'Редактирование города' },
  { name: 'EditEmployeerForm', translation: 'Редактирование сотрудника' },
]

let isDialogOpen = ref(false)
let mode = ref('editRegion')
const currentForm = ref(forms[0])

const currentRegionArea = ref({})


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

const editCity = (formData) => {
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

const closeDialog = () => {
  isDialogOpen.value = false
}

const openDialog = (formName) => {
  currentForm.value = formName
  isDialogOpen.value = true
}

</script>

<template>
  <v-btn @click="openDialog">Открыть модалку</v-btn>

  <BaseDialog
    :value="isDialogOpen"
    :currentForm="currentForm"
    @addCity="addCity"
    @editCity="editCity"
    @closeDialog="closeDialog"
  ></BaseDialog>
</template>
