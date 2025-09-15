<script setup>
import { ref, watch } from 'vue'

const emits = defineEmits(['update'])
// const props = defineProps(['x', 'y', 'region'])
const props = defineProps(['city'])

const formData = ref([])

let valid = ref(false)
// let cityName = ref('')
// const regionName = ref(props.region || 'имя региона')
// let x = ref(props.x || '')
// let y = ref(props.y || '')

formData.value = JSON.parse(JSON.stringify(props.city))

const form = ref(null)

const cityNameRules = [
  v => !!v || 'Введите название города',
  v => (v && v.length >= 2) || 'Название должно быть минимум 2 символа'
]

// console.log('form', form)
// console.log('form.value', form.value)
// console.log('form.value.validate()', form.value.validate())

watch(formData, () => {
  console.log('watch formData', form.value?.validate())
  const isValid = form.value ? form.value?.validate() : false
  emits('update', { ...formData.value, valid: isValid })
}, { deep: true, immediate: true })


// watch([formData.value], () => {
//   const isValid = form.value ? form.value?.validate() : false
//   console.log('isvalid', isValid)
//   emits('update', { name: formData.name, valid: isValid })
// }, { immediate: true })


const requiredRule = v => !!v || 'Поле обязательно для заполнения'
// const phoneRules = [
//   v => !!v || 'Номер телефона является обязательным',
//   v => {
//     const digits = v.replace(/\D/g, '')
//     return digits.length === 11 || 'Номер телефона должен быть корректным'
//   }
// ]

</script>


<template>
  <v-sheet class="mx-auto" width="300">
    <v-form ref="form" v-model="valid" lazy-validation>

            <!-- name: 'Рыткучи',
            countryId: 43,
            x: '701',
            y: '60',
            countryName: 'Russian Federation',
            rfId: null,
            regionName: 'Чукотский автономный округ', -->

      <v-text-field
        v-model="formData.name"
        :rules="[requiredRule]"
        label="Название региона"
      ></v-text-field>

      <!-- <v-text-field
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
      ></v-text-field> -->
    </v-form>
  </v-sheet>
</template>