<script setup>
import { ref } from 'vue'

import BaseDialog from './BaseDialog.vue'

defineEmits(['closeDialog', 'addCity', 'updateCity'])

const forms = [
  { name: 'AddCityForm', translation: 'Создать город' },
  { name: 'EditCityForm', translation: 'Редактирование города' },
]

let isDialogOpen = ref(false)
let mode = ref('editRegion')
const currentForm = ref(forms[0])
const currentCity = {
  id: 1,
  name: 'Хатырка',
  x: '650',
  y: '60',
  countryId: 43,
  countryName: 'Russian Federation',
  rfId: null,
  regionName: 'Чукотский автономный округ',
  shops: [
    {
      id: 52,
      name: 'м-н Рыткучи',
      address: 'ул. Полянская',
      cityId: 9,
      countryId: 43,
      neededEmployees: 5,
      countEmployee: 1,
      employees: [
        {
            id: 6,
            firstName: 'Иван',
            lastName: 'Иванов',
            middleName: 'Иванович',
            shopId: 52,
        }
      ],
    }
  ],
  fill: 'FFFFFF',
  hidden: false
}

const currentRegionArea = ref({
  cities: []
})


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

const handleAddCity = () => {
  openDialog(forms[0])
}

const handleEditCity = () => {
  openDialog(forms[1])
}

</script>

<template>
  <v-btn @click="handleAddCity">Открыть добавление города</v-btn>
  <v-btn @click="handleEditCity">Открыть редактирование города</v-btn>

  <BaseDialog
    :value="isDialogOpen"
    :currentForm="currentForm"
    :city="currentCity"
    @addCity="addCity"
    @editCity="editCity"
    @closeDialog="closeDialog"
  ></BaseDialog>
</template>
