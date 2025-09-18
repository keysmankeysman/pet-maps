<script setup>
import { ref, watch } from 'vue'

const emits = defineEmits(['update'])
const props = defineProps(['city'])

const formData = ref([])

formData.value = JSON.parse(JSON.stringify(props.city))

const form = ref(null)
const valid = ref(false)

const requiredRule = v => !!v || 'Поле обязательно для заполнения'
const phoneRules = [
  v => !!v || 'Номер телефона является обязательным',
  v => {
    const digits = v.replace(/\D/g, '')
    return digits.length === 11 || 'Номер телефона должен быть корректным'
  }
]

watch(formData, () => {
  const isValid = form.value ? form.value?.validate() : false
  emits('update', { ...formData.value, valid: isValid.valid })
}, { deep: true, immediate: true })

// ... остальной код (createShop, addShop, removeShop и т.д.)
</script>

<template>
  <v-container class="pa-4" max-width="800">
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-icon>mdi-city</v-icon>
      <v-text-field
        v-model="formData.name"
        label="Город"
        :rules="[requiredRule]"
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
              :rules="[requiredRule]"
              required
            ></v-text-field>

            <v-text-field
              v-model="shop.address"
              label="Адрес"
              :rules="[requiredRule]"
              required
            ></v-text-field>

            <v-text-field
              type="number"
              v-model="shop.neededEmployees"
              label="Необходимо сотрудников"
              :rules="[v => v !== null && v !== undefined && v >= 0 || 'Введите количество необходимых сотрудников']"
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
                  :rules="[requiredRule]"
                  required
                ></v-text-field>

                <v-text-field
                  v-model="employee.lastName"
                  label="Фамилия"
                  :rules="[requiredRule]"
                  required
                ></v-text-field>

                <v-text-field
                  v-model="employee.middleName"
                  label="Отчество"
                  :rules="[requiredRule]"
                  required
                ></v-text-field>

                <v-text-field
                  v-model="employee.phone"
                  label="Телефон"
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
</template>