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
  <v-app-bar>
    <div class="d-flex align-center header-left-wrp">
      <img
        src="../assets/logo.svg"
        alt="Логотип"
        class="me-4 ml-4 header-left__img"
      />
      <v-toolbar-title class="mb-0 header-left__title">
        Мониторинг сотрудников
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
  flex: 1 0 auto; 
  min-width: 0;
}

.header-left__img {
  width: 100%;
  max-width: 50px;
}

.header-left__title {
  flex: 1 1 auto;
  white-space: normal; 
  text-overflow: ellipsis; 
  min-width: 0;
}

</style>
