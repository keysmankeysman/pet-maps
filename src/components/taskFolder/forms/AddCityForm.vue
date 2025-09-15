<script setup>
import { ref, watch } from 'vue'

const emits = defineEmits(['update'])
const props = defineProps(['city'])

const formData = ref([])

let valid = ref(false)

formData.value = JSON.parse(JSON.stringify(props.city))

const form = ref(null)


// watch(formData, () => {
//   console.log('watch formData', form.value?.validate())
//   const isValid = form.value ? form.value?.validate() : false
//   emits('update', { ...formData.value, valid: isValid })
// }, { deep: true, immediate: true })

watch(formData, () => {
  if (!form.value) {
    emits('update', { ...formData.value, valid: false })
    return
  }
  form.value.validate().then(isValid => {
    // console.log('watch formData', isValid)
    console.log('isValid: ', isValid.valid)
    emits('update', { ...formData.value, valid: isValid })
  })
}, { deep: true, immediate: true })


// watch([formData.value], () => {
//   const isValid = form.value ? form.value?.validate() : false
//   console.log('isvalid', isValid)
//   emits('update', { name: formData.name, valid: isValid })
// }, { immediate: true })

const nameRules = [
  v => !!v || 'Поле обязательно',
  v => (v && v.length >= 2) || 'Минимум 2 символа',
  v => /^[а-яА-Яa-zA-Z]+$/.test(v) || 'Только буквы'
]
// const requiredRule = v => !!v || 'Поле обязательно для заполнения'

</script>


<template>
  <v-sheet class="mx-auto" width="300">
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-text-field
        v-model="formData.name"
        :rules="nameRules"
        label="Название региона"
      ></v-text-field>
    </v-form>
  </v-sheet>
</template>