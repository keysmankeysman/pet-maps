<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true
  }
})


const emit = defineEmits(['update:modelValue'])

const isVisible = ref(props.modelValue)

watch(() => props.modelValue, (newValue) => {
  isVisible.value = newValue
})

const onClose = () => {
  emit('update:modelValue', false)
}


</script>


<template>
  <v-dialog v-model="isVisible" max-width="600px" persistent>
    <v-card>
      <v-card-title>
        <span class="text-h5">Модальное окно</span>
      </v-card-title>
      <v-card-text>
        <slot></slot>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn class="ms-auto" text="Ok" @click="createCity"></v-btn>
        <v-btn color="primary" @click="onClose">Закрыть</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>




