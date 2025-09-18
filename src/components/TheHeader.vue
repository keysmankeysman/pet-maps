<script setup>
import { eventBus } from '../eventBus'

function enableDefineCoords() {
  eventBus.emit('enable-define-coords')
}

function disableDefineCoords() {
  eventBus.emit('disable-define-coords')
}

</script>

<!-- 
<v-app-bar app>
  <div class="d-flex align-center me-4" style="flex: 1 1 auto; min-width: 0;">
    <v-img
      src="../assets/logo.svg"
      alt="Логотип"
      max-height="40"
      contain
      class="me-2"
      style="flex-shrink: 0;"
    ></v-img>
    <v-toolbar-title class="mb-0" style="white-space: normal; overflow: hidden; text-overflow: ellipsis; min-width: 0;">
      Интерактивная svg карта
    </v-toolbar-title>
  </div>

  <v-spacer></v-spacer>

  <v-btn
    color="primary"
    text
    @click="enableDefineCoords"
  >
    Добавить новый город
  </v-btn>
  <v-btn
    text
    @click="disableDefineCoords"
  >
    отмена
  </v-btn>
</v-app-bar> -->

<template>
  <v-app-bar>
    <div class="d-flex align-center header-left-wrp">
      <v-img
        src="../assets/logo.svg"
        alt="Логотип"
        max-height="40"
        contain
        class="me-2"
        style="flex-shrink: 0;"
      ></v-img>
      <v-toolbar-title class="mb-0 header-left__title">
        Интерактивная svg карта
      </v-toolbar-title>
    </div>

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

.header-left-wrp {
  flex: 0 0 auto; 
  min-width: 0;
}

.header-left__title {
  /* flex: 1 1 auto !important;  */
  white-space: normal; 
  overflow: hidden; 
  text-overflow: ellipsis; 
  min-width: 0;
}

</style>
