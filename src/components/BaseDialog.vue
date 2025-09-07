<script setup>
import { ref, watch, defineAsyncComponent } from 'vue'

const components = {
  'AddCityForm': defineAsyncComponent(() => import('./forms/AddCityForm.vue')),
  'AddShopForm': defineAsyncComponent(() => import('./forms/AddShopForm.vue')),
  'EditRegionForm': defineAsyncComponent(() => import('./forms/EditRegionForm.vue')),
  'EditCityForm': defineAsyncComponent(() => import('./forms/EditCityForm.vue')),
  'AddEmployeerForm': defineAsyncComponent(() => import('./forms/AddEmployeerForm.vue')),
  'EditEmployeerForm': defineAsyncComponent(() => import('./forms/EditEmployeerForm.vue')),
}

const props = defineProps({
  value: {
    type: Boolean,
    required: true
  },
  nameForm: {
    type: String,
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
  city: {
    type: Object,
    required: false
  },
  shop: {
    type: Object,
    required: false
  },
})

let dialog = ref(props.value)
let formData = ref({})

const emits = defineEmits(['update', 'input', 'closeDialog', 'updateRegions', 'addCity', 'addShop', 'editEmployeer'])

watch(
  () => props.value,
  (newVal) => {
    dialog.value = newVal
  }
)

watch(dialog, (newVal) => {
  emits('input', newVal)
})

const closeDialog = () => {
  dialog.value = false
  emits('closeDialog')
}

const updateData = (newData) => {
  formData.value = newData
}

const save = () => {
  switch (props.nameForm) {
    case 'AddCityForm':
      emits('addCity', formData.value )
    break;
    case 'AddShopForm':
      emits('addShop', formData.value )
    break;
    case 'EditRegionForm':
      emits('updateRegions', formData.value )
    break;
    case 'EditEmployeerForm':
      emits('updateEmployeer', formData.value )
    break;
    case 'EditCityForm':
      emits('updateCity', formData.value )
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
        <v-toolbar-title>{{ nameForm }}</v-toolbar-title>
      </v-toolbar>


      <v-card-text>
        <component
          :is="components[nameForm]"
          :region="region"
          :x="x"
          :y="y"
          :city="city"
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


