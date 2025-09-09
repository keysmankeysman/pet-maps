<script setup>
import { eventBus } from '../eventBus'

function enableDefineCoords() {
  eventBus.emit('enable-define-coords')
}

function disableDefineCoords() {
  eventBus.emit('disable-define-coords')
}

</script>


<template>
  <v-app-bar app>
    <v-img
      src="../assets/logo.svg"
      alt="Логотип"
      max-height="40"
      contain
      class="me-4"
    ></v-img>

    <v-toolbar-title>Интерактивная svg карта</v-toolbar-title>

    <v-spacer></v-spacer>

    <v-btn
      color="primary"
      text="Добавить новый город"
      @click="enableDefineCoords"
    ></v-btn>
    <v-btn
      class="ms-auto"
      text="отмена"
      @click="disableDefineCoords"
    ></v-btn>

  </v-app-bar>
</template>


<style>

</style>
