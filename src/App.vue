<template>
  <v-app>
    <v-main>
      <!-- <Main></Main> -->
      <The-Header></The-Header>
      <router-view />
    </v-main>
  </v-app>
</template>

<script setup>
import TheHeader from './components/TheHeader.vue'
// import Main from './components/taskFolder/Main.vue'

</script>
