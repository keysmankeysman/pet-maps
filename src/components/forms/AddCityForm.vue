<script setup>
import { ref, watch } from 'vue'

const emits = defineEmits(['update'])
const props = defineProps(['x', 'y'])

let cityName = ref('')
let x = ref(props.x)
let y = ref(props.y)

watch(cityName, (newVal) => {
  emits('update', { name: newVal, x, y })
}, { immediate: true })

</script>

<template>
  <v-sheet class="mx-auto" width="300">
    <v-form fast-fail @submit.prevent>
      <v-text-field
        v-model="cityName"
        label="Название города"
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
