<script setup>
import { ref, watch } from 'vue'
import { usePrintMap } from '@/composables/usePrintMap.js'

const svgMap = ref(null)

const props = defineProps(['regions', 'cities', 'mode'])
const emits = defineEmits(['clickCircle', 'clickRegion'])

const { printRegion, clearPrintRegion, regionHover } = usePrintMap()

console.log(props.mode)

watch(() => props.mode, (newVal) => {
  console.log('мод поменялся', newVal)
  if (newVal === 'defineCoords') {
    svgMap.value.classList.add('edit-mode')
  } else {
    svgMap.value.classList.remove('edit-mode')
  }
})

const clickRegion = (region, event) => {
  emits('clickRegion', region, event)
}

</script>

<template>
  <svg
    id="svg-map"
    xmlns="http://www.w3.org/2000/svg"
    width="100%"
    height="100%"
    viewBox="-60 0 970 460"
    ref="svgMap"
  >
    <g
      v-for="region in regions" 
      :key="`region-${region.id}`"
      class="svg-group"
      :id="region.regionName"
      :class="{ hover: regionHover === region.id }"
      @mouseover="printRegion(region)"
      @mouseout="clearPrintRegion()"
      @click="clickRegion(region, $event)"
    >
      <title>{{ region.regionName }}</title>
      <path
        v-for="obj in region.paths"
        :id="obj.id"
        :d="obj.d"
        :transform="obj.transform"
        :fill="obj.fill"
        :stroke="obj.stroke"
        :key="obj.id"
      />

      <g class="pins__cities" v-for="city in region.cities" :key="city.id">
        <title>{{ city.name }}, {{ city.regionName }}</title>
        <circle
          @click="$emit('clickCircle', {city, $event})"
          class="circle"
          :cx="city.x"
          :cy="city.y"
          r="4"
          :fill="city.fill"
          stroke-width="1.0"
          stroke="#ffffff"
        />
      </g>
    </g>
  </svg>
</template>

<style scoped>

.edit-mode {
  border: 3px solid red;
}

</style>