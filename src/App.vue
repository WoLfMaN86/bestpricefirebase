<script setup>
// import HelloWorld from './components/HelloWorld.vue'
// import Navbar1 from './components/Navbar1.vue'
import Navbar2 from "./components/Navbar2.vue";
// import Navbar from './components/Navbar.vue'
import Footer from "./components/Footer.vue";

// //Lo siguiente lo sacamos de la practica de partido
// import { storeToRefs } from 'pinia'
// import { authStore } from '@/stores/auth'
import { onMounted } from "vue";

// const auth = authStore()
// const { tipoUsuario } = storeToRefs(auth)
// const { cambiarNivel } = auth
</script>

<template>
  <Navbar2 />

  <router-view></router-view>
  <Footer></Footer>

  <!-- //Esto sale de la practica partidos. -->
  <!-- <div class="container text-start">
    <h1 class="my-3">Práctica con Datos Deportivos</h1>
    <div class="my-4">Tipo de usuario <span class="badge text-bg-primary" @click="cambiarNivel">{{ tipoUsuario }}</span></div>

    <div class="mb-3">
      <router-link :to="{ name: 'home' }" :class="$route.name == 'home' ? 'text-white bg-success' : ''" class="text-decoration-none p-2 me-2">Home</router-link>
      <router-link :to="{ name: 'partidos' }" :class="$route.name == 'partidos' ? 'text-white bg-success' : ''" class="text-decoration-none p-2 me-2">Partidos</router-link>
      <router-link :to="{ name: 'about' }" :class="$route.name == 'about' ? 'text-white bg-success' : ''" class="text-decoration-none p-2 me-2">About</router-link>
      <router-link :to="{ name: 'nested-about' }" :class="($route.name && $route.name.startsWith('nested')) ? 'text-white bg-success' : ''" class="text-decoration-none p-2 me-2">Nested</router-link>
    </div>-->

  <!-- </div> -->
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
/* Esto sale de la practica partidos. */
/* :deep(.badge) {
  cursor: pointer;
} */
</style>
