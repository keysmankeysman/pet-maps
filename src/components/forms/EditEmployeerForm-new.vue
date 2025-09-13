
<template>
  <v-form ref="form" v-model="valid" lazy-validation>
    <v-text-field
      label="Имя"
      v-model="firstName"
      :rules="nameRules"
      required
    ></v-text-field>

    <v-text-field
      label="Фамилия"
      v-model="lastName"
      :rules="nameRules"
      required
    ></v-text-field>

    <v-text-field
      label="Телефон"
      v-model="phone"
      :rules="phoneRules"
      required
      hint="+7 (999) 999-99-99"
      persistent-hint
    ></v-text-field>

    <v-text-field
      label="Возраст"
      v-model="age"
      :rules="ageRules"
      required
      type="number"
    ></v-text-field>

    <v-btn :disabled="!valid" @click="submit">Отправить</v-btn>
  </v-form>
</template>

<script setup>
import { ref } from 'vue'

const valid = ref(false)
const firstName = ref('')
const lastName = ref('')
const phone = ref('')
const age = ref(null)

// Правила для имени и фамилии: обязательно, минимум 2 символа, только буквы
const nameRules = [
  v => !!v || 'Поле обязательно',
  v => (v && v.length >= 2) || 'Минимум 2 символа',
  v => /^[а-яА-Яa-zA-Z]+$/.test(v) || 'Только буквы'
]

// Правила для телефона: обязательно, формат +7 (999) 999-99-99
const phoneRules = [
  v => !!v || 'Телефон обязателен',
  v => /^\+7\s\$\d{3}\$\s\d{3}-\d{2}-\d{2}$/.test(v) || 'Неверный формат телефона'
]

// Правила для возраста: обязательно, число, от 1 до 120
const ageRules = [
  v => !!v || 'Возраст обязателен',
  v => Number.isInteger(+v) || 'Возраст должен быть числом',
  v => +v > 0 || 'Возраст должен быть больше 0',
  v => +v <= 120 || 'Возраст должен быть меньше или равен 120'
]

function submit() {
  if (valid.value) {
    alert(`Имя: ${firstName.value}\nФамилия: ${lastName.value}\nТелефон: ${phone.value}\nВозраст: ${age.value}`)
  }
}
</script>