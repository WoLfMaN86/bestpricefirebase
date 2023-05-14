<template>
  <div class="container">
    <h2 class="title">Editar Tienda Online</h2>
    <form @submit.prevent="updateTienda" class="form">
      <div class="form-control">
        <label for="nombre" class="label">Nombre:</label>
        <input
          id="nombre"
          type="text"
          class="input"
          v-model="tienda.nombre"
          required
        />
      </div>
      <div class="form-control">
        <label for="codTienda" class="label">Código:</label>
        <input
          id="codTienda"
          type="text"
          class="input"
          v-model="tienda.codTienda"
          readonly
        />
      </div>
      <div class="form-control">
        <label for="telefono" class="label">Teléfono:</label>
        <input
          id="telefono"
          type="text"
          class="input"
          v-model="tienda.telefono"
          required
        />
      </div>
      <div class="form-control">
        <label for="codPostal" class="label">Códigos Postales:</label>
        <input
          id="codPostal"
          type="text"
          class="input"
          v-model="codigosPostales"
          placeholder="Separar códigos postales por coma (,)"
          required
        />
      </div>
      <div class="form-control">
        <label for="envio" class="label">Envío (€):</label>
        <input
          id="envio"
          type="number"
          class="input"
          v-model="tienda.envio"
          step="0.01"
        />
      </div>
      <div class="button-container">
        <button :disabled="Incompleto" type="submit" class="btn btn-primary">
          Actualizar
        </button>
        <button
          type="button"
          class="btn btn-secondary"
          @click="$emit('cancel')"
        >
          Cancelar
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { usaTiendaOnlinesStore } from "@/components/stores/tiendaOnlineStore.js";

export default defineComponent({
  props: {
    tienda: Object,
  },
  computed: {
    Incompleto() {
      return (
        !this.tienda.codTienda ||
        !this.tienda.nombre ||
        !this.tienda.telefono ||
        !this.codigosPostales ||
        !this.codigosPostales
          .split(",")
          .every((codigo) => /^\d{5}$/.test(codigo.trim()))
      );
    },
  },
  data() {
    return {
      tiendasOnlineStore: usaTiendaOnlinesStore(),
      codigosPostales: this.tienda.codPostal.join(", "),
    };
  },
  methods: {
    updateTienda() {
      const tiendaActualizada = {
        ...this.tienda,
        codPostal: this.codigosPostales.split(",").map((cp) => cp.trim()),
      };
      const index = this.tiendasOnlineStore.buscarIndiceTienda(
        this.tienda.codTienda
      );
      this.tiendasOnlineStore.actualizarTienda(index, tiendaActualizada);
      this.$emit("update");
    },
  },
});
</script>

<style scoped>
.container {
  max-width: 600px;
  margin: 2vw auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.title {
  font-size: 24px;
  text-align: center;
  width: 100%;
  margin-bottom: 30px;
}

.form {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.form-control {
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
}

.label {
  font-size: 18px;
  margin-bottom: 5px;
}

.input {
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.btn {
  padding: 10px;
  font-size: 16px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.btn:hover {
  background-color: #3e8e41;
}

.form-control-file {
  margin-top: 10px;
}

.img-thumbnail {
  margin-top: 10px;
  max-width: 100%;
  height: auto;
}
.button-container {
  display: flex;
  justify-content: center;
  gap: 15px;
}
</style>
