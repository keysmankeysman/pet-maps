<script setup>
import { ref, watch } from 'vue'

const emits = defineEmits(['update'])
const props = defineProps(['city'])

const formData = ref([])
const form = ref(null)
let valid = ref(false)

formData.value = JSON.parse(JSON.stringify(props.city))

watch(formData, () => {
  if (!form.value) {
    emits('update', { ...formData.value, valid: false })
    return
  }
  form.value.validate().then(isValid => {
    emits('update', { ...formData.value, valid: isValid.valid })
  })
}, { deep: true, immediate: true })

function createShop() {
  return {
    id: Date.now() + Math.random(),
    name: '',
    address: '',
    cityId: props.city.id,
    countryId: 43,
    neededEmployees: 0,
    countEmployee: 0,
    employees: [],
  }
}

function createEmployee() {
  return {
    id: Date.now() + Math.random(),
    name: '',
    position: '',
  }
}

const addShop = () => {
  formData.value.shops.push(createShop())
}

const addEmployee = (shopIndex) => {
  formData.value.shops[shopIndex].employees.push(createEmployee())
}

const removeShop = (index) => {
  formData.value.shops.splice(index, 1)
}

const removeEmployee = (shopIndex, empIndex) => {
  formData.value.shops[shopIndex].employees.splice(empIndex, 1)
}

const phoneRules = [
  v => !!v || 'Номер телефона является обязательным',
  v => {
    const digits = v.replace(/\D/g, '')
    return digits.length === 11 || 'Номер телефона должен быть корректным'
  }
]

</script>

<template>
  <v-container class="pa-4" max-width="800">
    <v-form ref="form" v-model="valid">
      <v-icon>mdi-city</v-icon>
      <v-text-field
        v-model="formData.name"
        label="Город"
        :rules="[v => !!v || 'Введите название города']"
        required
      ></v-text-field>

      <v-divider class="my-4"></v-divider>

      <div v-for="(shop, shopIndex) in formData.shops" :key="shop.id" class="mb-6">
        <v-card outlined>
          <v-card-title class="d-flex justify-space-between align-center">
            <div> <v-icon>mdi-store</v-icon> Магазин {{ shopIndex + 1 }}</div>
            <v-btn icon color="red" @click="removeShop(shopIndex)" :aria-label="'Удалить магазин ' + (shopIndex + 1)">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-card-title>

          <v-card-text>
            <v-text-field
              v-model="shop.name"
              label="Название"
              :rules="[v => !!v || 'Введите навание магазина']"
              required
            ></v-text-field>

            <v-text-field
              v-model="shop.address"
              label="Название"
              :rules="[v => !!v || 'Введите адрес магазина']"
              required
            ></v-text-field>

            <v-text-field
              type="number"
              v-model="shop.neededEmployees"
              label="Необходимо сотрудников"
              :rules="[v => !!v || 'Введите количество необходимых сотрудников']"
              required
            ></v-text-field>



            <v-divider class="my-3"></v-divider>

            <div v-for="(employee, empIndex) in shop.employees" :key="employee.id" class="mb-4">
              <v-card outlined class="pa-3">
                <div class="d-flex justify-space-between align-center mb-2">
                  <div><v-icon>mdi-account-tie</v-icon>Сотрудник {{ empIndex + 1 }}</div>
                  <v-btn icon color="red" @click="removeEmployee(shopIndex, empIndex)" :aria-label="'Удалить сотрудника ' + (empIndex + 1)">
                    <v-icon>mdi-close</v-icon>
                  </v-btn>
                </div>

                <v-text-field
                  v-model="employee.firstName"
                  label="Имя"
                  :rules="[v => !!v || 'Введите имя сотрудника']"
                  required
                ></v-text-field>

                <v-text-field
                  v-model="employee.lastName"
                  label="Фамилия"
                  :rules="[v => !!v || 'Введите фамилию сотрудника']"
                  required
                ></v-text-field>

                <v-text-field
                  v-model="employee.middleName"
                  label="Отчество"
                  :rules="[v => !!v || 'Введите отчество сотрудника']"
                  required
                ></v-text-field>

                  <v-text-field
                    v-model="employee.phone"
                    label="Phone Number"
                    v-mask="'+7 (###) ###-##-##'"
                    :rules="phoneRules"
                    required
                    placeholder="+7 (___) ___-__-__"
                  ></v-text-field>

              </v-card>
            </div>

            <v-btn color="primary" text @click="addEmployee(shopIndex)">
              <v-icon left>mdi-plus</v-icon> Добавить сотрудника
            </v-btn>
          </v-card-text>
        </v-card>
      </div>

      <v-btn color="primary" class="mb-4" @click="addShop">
        <v-icon left>mdi-plus</v-icon> Добавить магазин
      </v-btn>

    </v-form>
  </v-container>




  <!-- <v-sheet class="mx-auto" width="600">
    <v-form fast-fail>
      Город: {{ formData.name }}
      <v-text-field
        v-model="formData.name"
        label="Название города"
      ></v-text-field>
      <v-card v-for="(shop, index) in formData.shops" :key="shop.id">
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
  </v-sheet> -->
</template>
