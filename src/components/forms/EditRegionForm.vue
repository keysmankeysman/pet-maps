<script setup>
import { ref, watch } from 'vue'

const emits = defineEmits(['update'])
const props = defineProps(['region'])

let hashColorRegion = ref(props.region.color)

watch(hashColorRegion, (newVal) => {
  emits('update', { hex: newVal })
}, { immediate: true })

</script>

<template>
  <v-sheet class="mx-auto" width="300">
    <v-form fast-fail>
      Регион: {{ region.regionName }}
      ID региона: {{ region.id }}
      <v-text-field
        v-model="hashColorRegion"
        label="Цвет региона"
      ></v-text-field>
    </v-form>
  </v-sheet>
</template>
