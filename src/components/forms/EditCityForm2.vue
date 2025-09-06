<template>
  <v-container class="pa-4" max-width="800">
    <v-form ref="form" @submit.prevent="submitForm" lazy-validation>
      <v-text-field
        v-model="cityName"
        label="Город"
        :rules="[v => !!v || 'Название города обязательно']"
        required
      ></v-text-field>

      <v-divider class="my-4"></v-divider>

      <div v-for="(shop, shopIndex) in shops" :key="shop.id" class="mb-6">
        <v-card outlined>
          <v-card-title class="d-flex justify-space-between align-center">
            <div>Магазин {{ shopIndex + 1 }}</div>
            <v-btn icon color="red" @click="removeShop(shopIndex)" :aria-label="'Remove shop ' + (shopIndex + 1)">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-card-title>

          <v-card-text>
            <v-text-field
              v-model="shop.name"
              label="Shop Name"
              :rules="[v => !!v || 'Shop name is required']"
              required
            ></v-text-field>

            <v-divider class="my-3"></v-divider>

            <div v-for="(employee, empIndex) in shop.employees" :key="employee.id" class="mb-4">
              <v-card outlined class="pa-3">
                <div class="d-flex justify-space-between align-center mb-2">
                  <div>Сотрудник {{ empIndex + 1 }}</div>
                  <v-btn icon color="red" @click="removeEmployee(shopIndex, empIndex)" :aria-label="'Удалить сотрудника ' + (empIndex + 1)">
                    <v-icon>mdi-close</v-icon>
                  </v-btn>
                </div>

                <v-text-field
                  v-model="employee.name"
                  label="Employee Name"
                  :rules="[v => !!v || 'Employee name is required']"
                  required
                ></v-text-field>

                <v-text-field
                  v-model="employee.position"
                  label="Position"
                  :rules="[v => !!v || 'Position is required']"
                  required
                ></v-text-field>
              </v-card>
            </div>

            <v-btn color="primary" text @click="addEmployee(shopIndex)">
              <v-icon left>mdi-plus</v-icon> Add Employee
            </v-btn>
          </v-card-text>
        </v-card>
      </div>

      <v-btn color="primary" class="mb-4" @click="addShop">
        <v-icon left>mdi-plus</v-icon> Add Shop
      </v-btn>

      <v-btn type="submit" color="success" :disabled="!formIsValid">
        Submit
      </v-btn>
    </v-form>
  </v-container>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'

const cityName = ref('')
const shops = reactive(
[
  {
    id: 1,
    name: 'Shop One',
    employees: [
      { id: 101, name: 'Alice Johnson', position: 'Cashier' },
      { id: 102, name: 'Bob Smith', position: 'Manager' }
    ]
  },
  {
    id: 2,
    name: 'Shop Two',
    employees: [
      { id: 201, name: 'Carol White', position: 'Salesperson' },
      { id: 202, name: 'David Brown', position: 'Stock Clerk' }
    ]
  }
])

function createShop() {
  return {
    id: Date.now() + Math.random(),
    name: '',
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

function addShop() {
  shops.push(createShop())
}

function removeShop(index) {
  shops.splice(index, 1)
}

function addEmployee(shopIndex) {
  shops[shopIndex].employees.push(createEmployee())
}

function removeEmployee(shopIndex, empIndex) {
  shops[shopIndex].employees.splice(empIndex, 1)
}

const form = ref(null)

const formIsValid = computed(() => {
  if (!cityName.value) return false
  if (shops.length === 0) return false
  for (const shop of shops) {
    if (!shop.name) return false
    if (shop.employees.length === 0) return false
    for (const emp of shop.employees) {
      if (!emp.name || !emp.position) return false
    }
  }
  return true
})

function submitForm() {
  if (!formIsValid.value) {
    form.value.validate()
    return
  }

  alert('Form submitted!\n' + JSON.stringify({ cityName: cityName.value, shops }, null, 2))
}
</script>

<style scoped>
.v-card {
  background-color: #f9fafb;
}
</style>