<script setup>
import { ref, watch } from 'vue'

const emits = defineEmits(['update'])
const props = defineProps(['x', 'y', 'region'])

let cityName = ref('')
const regionName = ref(props.region || 'имя региона')
let x = ref(props.x || '')
let y = ref(props.y || '')

const form = ref(null)

const cityNameRules = [
  v => !!v || 'Введите название города',
  v => (v && v.length >= 2) || 'Название должно быть минимум 2 символа'
]

watch([cityName, x, y], () => {
  emits('update', { name: cityName.value, x: x.value, y: y.value, valid: form.value?.validate() })
}, { immediate: true })
</script>

<template>
  <v-sheet class="mx-auto" width="300">
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-text-field
        v-model="regionName"
        :disabled="true"
        label="Название региона"
      ></v-text-field>
      <v-text-field
        v-model="cityName"
        label="Название города"
        :rules="cityNameRules"
        required
      ></v-text-field>
      <v-text-field
        v-model="x"
        :disabled="true"
        label="Координата X"
      ></v-text-field>
      <v-text-field
        v-model="y"
        :disabled="true"
        label="Координата Y"
      ></v-text-field>
    </v-form>
  </v-sheet>
</template>