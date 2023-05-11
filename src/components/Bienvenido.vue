<template>
  <div class="container">
    <h1 class="text-center">¡¡¡ Bienvenido {{ codigoPostal.codigo }} !!!</h1>
    <p>Tu código postal es: {{ codigoPostal.codigo }}</p>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { usaCodPostalStore } from "@/components/stores/codPostal";

export default defineComponent({
  name: "Bienvenido",
  computed: {
    codigoPostal() {
      return usaCodPostalStore().codPostal;
    },
  },
});
</script>

<style>
.container {
  margin-top: 50px;
}
</style>
