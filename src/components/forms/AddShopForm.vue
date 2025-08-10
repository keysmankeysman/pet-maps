<script setup>
import { ref } from 'vue'
 
let cityName = ref('')

</script>

<template>
  <v-sheet class="mx-auto" width="300">
    <v-form fast-fail @submit.prevent>
      <v-text-field
        v-model="cityName"
        label="Название магазина"
      ></v-text-field>
    </v-form>
  </v-sheet>
</template>
