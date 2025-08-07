<script setup>
import { ref } from 'vue'

let firstName = ref('')
let lastName = ref('')

</script>

<template>
  <v-sheet class="mx-auto" width="300">
    <v-form fast-fail @submit.prevent>
      <v-text-field
        v-model="firstName"
        label="First name"
      ></v-text-field>

      <v-text-field
        v-model="lastName"
        label="Last name"
      ></v-text-field>
    </v-form>
  </v-sheet>
</template>
