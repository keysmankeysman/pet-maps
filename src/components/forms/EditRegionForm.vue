<script setup>
import { ref, watch } from 'vue'

const emits = defineEmits(['update'])
const props = defineProps(['region'])

let formData = ref({ hex: '#ffffff' })
const form = ref(null)
let valid = ref(false)

formData.value.hex = props.region.color

// watch(formData.value, (newVal) => {
//   emits('update', { hex: newVal.hex })
// }, { immediate: true })

watch(formData, () => {
  if (!form.value) {
    emits('update', { ...formData.value, valid: false })
    return
  }
  form.value.validate().then(isValid => {
    console.log('isValid: ', isValid.valid)
    emits('update', { ...formData.value, valid: isValid })
  })
}, { deep: true, immediate: true })


const hexRules = [
  v => !!v || 'Поле обязательно',
  v => (v && v.length === 7) || 'Должно быть 7 символов',
  v => v[0] === '#' || 'Первый символ должен быть #'
]

</script>

<template>
  <v-sheet class="mx-auto" width="300">
    <v-form ref="form" fast-fail v-model="valid" lazy-validation>
      {{ region.regionName }}
      <v-text-field
        v-model="formData.hex"
        label="Цвет региона"
        :rules="hexRules"
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
