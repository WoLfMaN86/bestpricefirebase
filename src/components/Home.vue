<template>
  <div class="home container" v-if="!codPostalStore.codPostal">
    <div class="row">
      <div class="col-md-6 text-center">
        <h1>¡Bienvenido a BestPrice!</h1>
        <p>La web con los productos al mejor precio</p>
        <form @submit.prevent="submitForm">
          <label for="postalCode" style="margin-bottom: 1rem"
            >Introduce tu código postal para encontrar tus supermercados más
            cercanos</label
          >
          <input
            v-model="postalCode"
            type="text"
            id="postalCode"
            class="form-control"
          />
          <div
            v-if="postalCode.length > 0 && !isValidPostalCode"
            class="text-danger"
          >
            Por favor, introduce un código postal de 5 cifras.
          </div>
          <button
            type="submit"
            class="btn btn-primary mt-3"
            :disabled="!isValidPostalCode || isNavigating"
          >
            Enviar
          </button>
        </form>
      </div>
      <div class="col-md-6">
        <img
          src="/src/assets/logoHome.png"
          alt="Logo Best Price"
          class="img-fluid"
        />
      </div>
    </div>
  </div>
  <div v-else>
    <router-view></router-view>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { usaCodPostalStore } from "@/components/stores/codPostal.js";

export default defineComponent({
  name: "Home",
  data() {
    return {
      postalCode: "",
      isNavigating: false,
      codPostalStore: usaCodPostalStore(),
    };
  },
  computed: {
    isValidPostalCode() {
      return this.postalCode.length === 5 && /^\d+$/.test(this.postalCode);
    },
  },
  methods: {
    submitForm() {
      if (this.isValidPostalCode) {
        const nuevoCodigo = {
          codigo: this.postalCode,
        };
        this.codPostalStore.setCodPostal(nuevoCodigo);
        this.isNavigating = true;
        this.navegarBienvenidos();
      }
    },
    navegarBienvenidos() {
      this.$router.replace({ name: "Bienvenido" });
      this.isNavigating = false;
    },
  },
  mounted() {
    if (this.codPostalStore.codPostal) {
      this.$router.replace({ name: "Bienvenido" });
    }
  },
});
</script>

<style scoped>
.home {
  padding: 5rem;
}

form {
  margin-top: 1rem;
}
</style>
