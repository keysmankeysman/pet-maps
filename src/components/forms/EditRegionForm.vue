<script setup>
import { ref, watch } from 'vue'

const emits = defineEmits(['update'])
const props = defineProps(['region'])

let formData = ref({ hex: '#ffffff' })
let valid = ref(false)

formData.value.hex = props.region.color

watch(formData.value, (newVal) => {
  emits('update', { hex: newVal.hex })
}, { immediate: true })

const nameRules = [
  v => !!v || 'Поле обязательно',
  v => (v && v.length >= 2) || 'Минимум 2 символа',
  v => /^[а-яА-Яa-zA-Z]+$/.test(v) || 'Только буквы'
]

</script>

<template>
  <v-sheet class="mx-auto" width="300">
    <v-form fast-fail v-model="valid" lazy-validation>
      {{ region.regionName }}
      <v-text-field
        v-model="formData.hex"
        label="Цвет региона"
        :rules="nameRules"
      ></v-text-field>
      <div class="hashView" :style="{ background: formData.hex }">

      </div>
    </v-form>
  </v-sheet>
</template>

<style scoped>

.hashView {
  width: 100%;
  height: 25px;
  background: white;
}

</style>
