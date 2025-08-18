<script setup>
import { ref } from 'vue'

const emits = defineEmits(['update'])

let employeerName = ref('')
// let shopAddress = ref('')
// let neededEmployees = ref('')

// const update = () => {
//   emits('update', { name: shopName, address: shopAddress, neededEmployees })
// }


</script>

<template>
  <v-sheet class="mx-auto" width="300">
    <v-form fast-fail @submit.prevent>
      <v-text-field
        v-model="employeerName"
        label="Имя сотрудника"
      ></v-text-field>
      <v-text-field
        v-model="employeerName"
        label="Фамилия сотрудника"
      ></v-text-field>
      <v-text-field
        v-model="employeerName"
        label="Отчество сотрудника"
      ></v-text-field>
      <v-text-field
        v-model="employeerName"
        label="Номер телефона"
      ></v-text-field>
    </v-form>
  </v-sheet>
</template>
