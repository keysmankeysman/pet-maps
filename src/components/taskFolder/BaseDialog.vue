<script setup>
import { ref, watch, defineAsyncComponent } from 'vue'

const components = {
  'AddCityForm': defineAsyncComponent(() => import('./forms/AddCityForm.vue')),
  'EditCityForm': defineAsyncComponent(() => import('./forms/EditCityForm.vue')),
}

const props = defineProps({
  value: {
    type: Boolean,
    required: true
  },
  currentForm: {
    type: Object,
    required: true
  },
  region: {
    type: Object,
    required: false
  },
  x: {
    type: Number,
    required: false
  },
  y: {
    type: Number,
    required: false
  },
  shop: {
    type: Object,
    required: false
  },
})

let valid = ref(false)
let dialog = ref(props.value)
let formData = ref({})

const emits = defineEmits([
  'addCity',
  'editCity',
  'closeDialog'
])

watch(
  () => props.value,
  (newVal) => {
    dialog.value = newVal
  }
)

const closeDialog = () => {
  dialog.value = false
  emits('closeDialog')
}

const updateData = (newData, valid = false) => {
  formData.value = newData
  console.log('updateData', valid)
  // valid.value = valid
}

const save = () => {
  switch (props.currentForm.name) {
    case 'AddCityForm':
      emits('addCity', formData.value )
    break;
    case 'EditCityForm':
      emits('editShop', formData.value )
    break;
  }

  closeDialog()
}


</script>


<template>
  <v-dialog
    v-model="dialog"
    max-width="800"
    persistent
  >
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
          :region="region"
          :x="x"
          :y="y"
          :shop="shop"
          @update="updateData"
        />
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="grey"
          text
          @click="closeDialog"
        >
          Отмена
        </v-btn>
        <v-btn
          color="primary"
          @click="save"
        >
          Сохранить
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}

.v-tab {
  min-width: 120px;
}
</style>


