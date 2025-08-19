<script setup>
// import { ref, watch } from 'vue'

const emits = defineEmits(['update'])
const props = defineProps(['city'])

// watch(hashColorRegion, (newVal) => {
//   emits('update', { hex: newVal })
// }, { immediate: true })

const addEmployeer = () => {

}

const delEmployeer = () => {

}

</script>

<template>
  <v-sheet class="mx-auto" width="600">
    <v-form fast-fail>
      Город: {{ city.name }}
      <v-text-field
        v-model="city.name"
        label="Название города"
      ></v-text-field>
      <v-card v-for="(shop, index) in city.shops" :key="shop.id">
        Магазин {{ index + 1 }}
        <v-row>
          <v-text-field
            class="mr-4"
            v-model="city.name"
            label="Название магазина"
          ></v-text-field>
          <v-text-field
            type="number"
            v-model="city.neededEmployees"
            label="Необходимо сотрудников"
          ></v-text-field>
        </v-row>
        <v-text-field
          v-model="city.address"
          label="Адрес магазина"
        ></v-text-field>
        
        <div v-if="shop.employees.length">
          
          <div  v-for="(employeer, index) in shop.employees" :key="employeer.id">
            Сотрудник {{ index + 1 }}
            <v-row>
              <v-text-field
                v-model="employeer.firstName"
                label="Имя"
              ></v-text-field>
              <v-text-field
                v-model="employeer.lastName"
                label="Фамилия"
              ></v-text-field>
              <v-text-field
                v-model="employeer.middleName"
                label="Отчество"
              ></v-text-field>
            </v-row>
            <v-text-field
              v-model="employeer.phone"
              label="Номер телефона"
            ></v-text-field>
            <v-btn
              color="error"
              class="ms-auto"
              text="Удалить сотрудника"
              @click="delEmployeer"
            ></v-btn>
          </div>
        </div>
        <v-btn
          color="primary"
          class="ms-auto"
          text="Добавить сотрудника"
          @click="addEmployeer"
        ></v-btn>

      </v-card>
    </v-form>
  </v-sheet>
</template>
