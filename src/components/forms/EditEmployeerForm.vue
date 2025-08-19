<script setup>
import { ref } from 'vue'

const emits = defineEmits(['update', 'addEmployeer'])
const props = defineProps(['shop'])

const formData = ref([])

formData.value = [...props.shop.employees]
console.log('formData.value', formData.value)

// const update = () => {
//   emits('update', { name: shopName, address: shopAddress, neededEmployees })
// }

const addEmployeer = () => {
  console.log('formData.value 2', formData.value)
 formData.value.push({
    id: 20,
    firstName: '',
    lastName: '',
    middleName: '',
    phone: '',
    shopId: 15,
 })
}

// const addEmployeer = () => {
//   currentShop.value.employees.push({
//     id: 20,
//     firstName: '',
//     lastName: '',
//     middleName: '',
//     phone: '',
//     shopId: currentShop.value.id,
//   })
// }


</script>

<template>
  <v-sheet class="mx-auto" width="600">
    <v-form v-if="formData.length" fast-fail @submit.prevent>
      <div v-for="formData in formData" :key="formData.id">
        <v-row>
          <v-text-field
            class="mr-4"
            v-model="formData.firstName"
            label="Имя"
          ></v-text-field>
          <v-text-field
            class="mr-4"
            v-model="formData.lastName"
            label="Фамилия"
          ></v-text-field>
          <v-text-field
            v-model="formData.middleName"
            label="Отчество"
          ></v-text-field>
        </v-row>
        <v-text-field
          v-model="formData.phone"
          label="Номер телефона"
        ></v-text-field>
      </div>
    </v-form>
    <div v-else>
      Нет сотрудников
      <v-btn
        class="ms-auto"
        @click="addEmployeer"
        text="Добавить"
      ></v-btn>
    </div>
  </v-sheet>
</template>
