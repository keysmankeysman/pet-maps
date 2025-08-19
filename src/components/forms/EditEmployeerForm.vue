<script setup>
import { ref } from 'vue'

const emits = defineEmits(['update'])
const props = defineProps(['shop'])

// let shopAddress = ref('')
// let neededEmployees = ref('')

// const update = () => {
//   emits('update', { name: shopName, address: shopAddress, neededEmployees })
// }


</script>

<template>
  <v-sheet class="mx-auto" width="600">
    <v-form fast-fail @submit.prevent>
      <div v-for="employeer in shop.employees" :key="employeer.id">
        <v-row>
          <v-text-field
            v-model="employeer.firstName"
            label="Имя"
          ></v-text-field>
          <v-text-field
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
  </v-sheet>
</template>
