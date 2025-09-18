<script setup>
import { ref, watch } from 'vue'

const emits = defineEmits(['update'])

let valid = ref(false)
const form = ref(null)

let formData = ref({
  name: '',
  address: '',
  neededEmployees: null,
})

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
]

const addressRules = [
  v => !!v || 'Поле обязательно',
  v => (v && v.length >= 2) || 'Минимум 2 символа'
]

const countEmployeesRules = [
  v => !!v || 'Поле обязательно',
  v => (Math.sign(v) === 1) || 'Значение должно быть больше 0',
]

</script>

<template>
  <v-sheet class="mx-auto mt-4" width="300">
    <v-form ref="form" v-model="valid" fast-fail @submit.prevent>
      <v-text-field
        v-model="formData.name"
        label="Название магазина"
        :rules="nameRules"
      ></v-text-field>
      <v-text-field
        v-model="formData.address"
        :rules="addressRules"
        label="Адрес магазина"
      ></v-text-field>
      <v-text-field
        type="number"
        v-model="formData.neededEmployees"
        :rules="countEmployeesRules"
        label="Требуется сотрудников"
      ></v-text-field>
    </v-form>
  </v-sheet>
</template>
