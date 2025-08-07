<script setup>
import { ref } from 'vue'

const props = defineProps({
    title: {
      type: String,
      default: 'Заголовок по умолчанию'
    },
    message: {
      type: String,
      default: 'Сообщение по умолчанию'
    },
    showDialog: {
      type: Boolean,
      default: false
    }
})

let showDialog = ref(false)


</script>



<template>
  <v-dialog
    v-model="dialog"
    max-width="600px"
  >
    <v-card>
      <v-card-title>
        <span class="headline">{{ title }}</span>
      </v-card-title>
      <v-card-text>
        {{ message }}
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="blue darken-1"
          text
          @click="closeDialog"
        >
          Закрыть
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {

  data() {
    return {
      dialog: this.showDialog // Используем prop для управления видимостью
    }
  },
  watch: {
    showDialog(newVal) {
      this.dialog = newVal;
    },
    dialog(newVal) {
      this.$emit('update:showDialog', newVal); // Эмитируем событие при изменении dialog
    }
  },
  methods: {
    closeDialog() {
      this.dialog = false;
    }
  }
};
</script>