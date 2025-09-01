<script setup>
import { ref, watch } from 'vue'

const emits = defineEmits(['update', 'addEmployeer'])
const props = defineProps(['shop'])

const formData = ref([])

formData.value = [...props.shop.employees]
console.log('formData.value', formData.value)

const update = (formData) => {
  emits('update', formData)
}

watch(formData, (newVal) => {
  update(newVal)
}, { immediate: true })


const addEmployeer = () => {
  formData.value.push({
    id: formData.value.length + 1,
    firstName: '',
    lastName: '',
    middleName: '',
    phone: '',
    shopId: 15,
  })
}

const delEmployeer = (id) => {
  console.log('delEmployeer', id)
  const index = formData.value.findIndex(el => el.id === id)
  console.log('index', index)
  formData.value.splice(index, 1)
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
      <div v-for="employeer in formData" :key="employeer.id">
        <v-row>
          <v-text-field
            class="mr-4"
            v-model="employeer.firstName"
            label="Имя"
          ></v-text-field>
          <v-text-field
            class="mr-4"
            v-model="employeer.lastName"
            label="Фамилия"
          ></v-text-field>
          <v-text-field
            v-model="employeer.middleName"
            label="Отчество"
          ></v-text-field>
        </v-row>
        <v-row>
          <v-text-field
            v-model="employeer.phone"
            label="Номер телефона"
          ></v-text-field>
          <v-btn
            class="ms-auto"
            color="error"
            @click="delEmployeer(employeer.id)"
            text="удалить"
          ></v-btn>
        </v-row>


      </div>
      <v-btn
        class="ms-auto"
        @click="addEmployeer"
        text="Добавить"
      ></v-btn>
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
