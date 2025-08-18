<script setup>
// import { ref, watch } from 'vue'

const emits = defineEmits(['update'])
const props = defineProps(['city'])

// watch(hashColorRegion, (newVal) => {
//   emits('update', { hex: newVal })
// }, { immediate: true })

</script>

<template>
  <v-sheet class="mx-auto" width="300">
    <v-form fast-fail>
      Город: {{ city.name }}
      <v-text-field
        v-model="city.name"
        label="Название города"
      ></v-text-field>
      Магазины:
      <v-card v-for="shop in city.shops" :key="shop.id">
        <v-text-field
          v-model="city.name"
          label="Название магазина"
        ></v-text-field>
        <v-text-field
          v-model="city.address"
          label="Адрес магазина"
        ></v-text-field>
        <v-text-field
          v-model="city.neededEmployees"
          label="Необходимо сотрудников"
        ></v-text-field>
        Сотрудники:
        
        <div v-for="employeer in shop.employees" :key="employeer.id">

          <v-text-field
            v-model="employeer.firstName"
            label="Имя сотрудника"
          ></v-text-field>
        </div>
      </v-card>
    </v-form>
  </v-sheet>
</template>
