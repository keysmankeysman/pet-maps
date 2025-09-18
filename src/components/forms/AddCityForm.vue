<script setup>
import { ref, watch } from 'vue'

const emits = defineEmits(['update'])
const props = defineProps(['x', 'y', 'region'])

let formData = ref({
  regionName: props.region.regionName,
  cityName: '',
  x: props.x,
  y: props.y
})
const form = ref(null)
let valid = ref(false)

watch(formData, () => {
  if (!form.value) {
    emits('update', { ...formData.value, valid: false })
    return
  }
  form.value.validate().then(isValid => {
    emits('update', { ...formData.value, valid: isValid.valid })
  })
}, { deep: true, immediate: true })

const nameRules = [
  v => !!v || 'Поле обязательно',
  v => (v && v.length >= 2) || 'Минимум 2 символа',
  v => /^[а-яА-Яa-zA-Z]+$/.test(v) || 'Только буквы'
]

</script>

<template>
  <v-sheet class="mx-auto" width="300">
    <v-form ref="form" v-model="valid" fast-fail @submit.prevent>
      <v-text-field
        v-model="formData.regionName"
        :disabled="true"
        label="Название региона"
      ></v-text-field>
      <v-text-field
        v-model="formData.cityName"
        :rules="nameRules"
        label="Название города"
      ></v-text-field>
      <v-text-field
        v-model="formData.x"
        :disabled="true"
        label="Координата X"
      ></v-text-field>
      <v-text-field
        v-model="formData.y"
        :disabled="true"
        label="Координата Y"
      ></v-text-field>
    </v-form>
  </v-sheet>
</template>
