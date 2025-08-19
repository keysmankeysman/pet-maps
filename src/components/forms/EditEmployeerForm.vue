<script setup>
import { ref } from 'vue'

const emits = defineEmits(['update', 'addEmployeer'])
const props = defineProps(['shop'])

// let shopAddress = ref('')
// let neededEmployees = ref('')

// const update = () => {
//   emits('update', { name: shopName, address: shopAddress, neededEmployees })
// }

const addEmployeer = () => {
  emits('addEmployeer')
}


</script>

<template>
  <v-sheet class="mx-auto" width="600">
    <v-form v-if="shop.employees.length" fast-fail @submit.prevent>
      <div v-for="employeer in shop.employees" :key="employeer.id">
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
        <v-text-field
          v-model="employeer.phone"
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
