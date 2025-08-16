<script setup>
import { ref, watch } from 'vue'

const emits = defineEmits(['update'])

let shopName = ref('')
let shopAddress = ref('')
let neededEmployees = ref('')

const update = () => {
  emits('update', { name: shopName, address: shopAddress, neededEmployees })
}

watch(shopName, () => {
  update()
}, { immediate: true })

watch(shopAddress, () => {
  update()
}, { immediate: true })

watch(neededEmployees, () => {
  update()
}, { immediate: true })


</script>

<template>
  <v-sheet class="mx-auto" width="300">
    <v-form fast-fail @submit.prevent>
      <v-text-field
        v-model="shopName"
        label="Название магазина"
      ></v-text-field>
      <v-text-field
        v-model="shopAddress"
        label="Адрес магазина"
      ></v-text-field>
      <v-text-field
        type="number"
        v-model="neededEmployees"
        label="Сотрудников необходимо"
      ></v-text-field>
    </v-form>
  </v-sheet>
</template>
