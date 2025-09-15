<script setup>
import { ref, watch, defineAsyncComponent } from 'vue'

const components = {
  'AddCityForm': defineAsyncComponent(() => import('./forms/AddCityForm.vue')),
  'EditCityForm': defineAsyncComponent(() => import('./forms/EditCityForm.vue')),
}

const props = defineProps({
  value: Boolean,
  currentForm: Object,
  city: Object,
})

const emits = defineEmits(['addCity', 'editCity', 'closeDialog'])

let dialog = ref(props.value)
let formData = ref({})
let formValid = ref(false)

watch(() => props.value, (newVal) => {
  dialog.value = newVal
})

const closeDialog = () => {
  dialog.value = false
  emits('closeDialog')
}

const updateData = (newData) => {
  // console.log('updateData', newData.valid.valid)
  formData.value = newData
  console.log('updateData 2', newData.valid)
  formValid.value = newData.valid.valid ?? false
}

const save = () => {
  if (!formValid.value) return

  switch (props.currentForm.name) {
    case 'AddCityForm':
      emits('addCity', formData.value)
      break
    case 'EditCityForm':
      emits('editCity', formData.value)
      break
  }
  closeDialog()
}
</script>

<template>
  <v-dialog v-model="dialog" max-width="800" persistent>
    <v-card>
      <v-toolbar dark color="primary">
        <v-btn icon dark @click="closeDialog">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title>{{ currentForm.translation }}</v-toolbar-title>
      </v-toolbar>

      <v-card-text>
        <component
          :is="components[currentForm.name]"
          :city="city"
          @update="updateData"
        />
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="grey" text @click="closeDialog">Отмена</v-btn>
        <v-btn color="primary" :disabled="!formValid" @click="save">Сохранить</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>