<script setup>
import { ref, watch } from 'vue'

const emits = defineEmits(['update'])

let shopName = ref('')
let shopAddress = ref('')

watch(shopName, (newVal) => {
  emits('update', { name: newVal, address: shopAddress })
}, { immediate: true })

watch(shopAddress, (newVal) => {
  emits('update', { name: shopName, address: newVal })
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
    </v-form>
  </v-sheet>
</template>
