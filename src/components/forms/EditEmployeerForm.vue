<script setup>
import { ref, watch } from 'vue'

const emits = defineEmits(['update', 'addEmployeer'])
const props = defineProps(['shop'])

const formData = ref([])
let shopName = ref('')

shopName = props.shop.name
formData.value = JSON.parse(JSON.stringify(props.shop.employees))
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
    shopId: props.shop.id,
  })
}

const delEmployeer = (id) => {
  if (formData.value.length <= 1) {
    formData.value[0].firstName = '' 
    formData.value[0].lastName = '' 
    formData.value[0].middleName = '' 
    formData.value[0].phone = '' 

    return
  }


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
  <v-container v-if="formData.length" class="pa-4" max-width="800">

    <v-card-text>
      <v-text-field
        v-model="shopName"
        label="Название магазина"
        :rules="[v => !!v || 'Введите название магазина']"
        required
      ></v-text-field>

      <v-divider class="my-3"></v-divider>

      <div v-for="(employee, empIndex) in shop" :key="employee.id" class="mb-4">
        <v-card outlined class="pa-3">
          <div class="d-flex justify-space-between align-center mb-2">
            <div>Employee {{ empIndex + 1 }}</div>
            <v-btn icon color="red" @click="removeEmployee(shopIndex, empIndex)" :aria-label="'Remove employee ' + (empIndex + 1)">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </div>

          <v-text-field
            v-model="employee.name"
            label="Employee Name"
            :rules="[v => !!v || 'Employee name is required']"
            required
          ></v-text-field>

          <v-text-field
            v-model="employee.position"
            label="Position"
            :rules="[v => !!v || 'Position is required']"
            required
          ></v-text-field>
        </v-card>
      </div>

      <v-btn color="primary" text @click="addEmployee(shopIndex)">
        <v-icon left>mdi-plus</v-icon> Add Employee
      </v-btn>
    </v-card-text>

  </v-container>

  <v-container v-else class="pa-4" max-width="800">
    Нет сотрудников
    <v-btn
      class="ms-auto"
      @click="addEmployeer"
      text="Добавить"
    ></v-btn>
  </v-container>

  <!-- <v-sheet class="mx-auto" width="600">
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
  </v-sheet> -->
</template>
