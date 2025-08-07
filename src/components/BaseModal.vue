<script setup>
import { ref } from 'vue'

const valid = ref(true)
const firstname = ref('')

defineProps(['showModal'])

</script>

<template>
  <v-dialog v-model="showModal" width="auto">
    <v-card
      max-width="400"
      prepend-icon="mdi-city"
      title="Добавить новый город"
    >
      <v-form v-model="valid">
        <v-container>
          <v-row>
            <v-col cols="12" md="12">
              <v-text-field
                v-model="firstname"
                :counter="10"
                label="Название города"
                required
              ></v-text-field>
            </v-col>
          </v-row>
        </v-container>
      </v-form>

      <template v-slot:actions>
        <v-btn class="ms-auto" text="Ok" @click="createCity"></v-btn>
        <v-btn class="ms-auto" text="Закрыть" @click="$emit('closeModal')"></v-btn>
      </template>
    </v-card>
  </v-dialog>
</template>
