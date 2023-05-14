<template>
  <div class="container">
    <h2 class="title">Editar Tienda</h2>
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
        <label for="direccion" class="label">Dirección:</label>
        <input
          id="direccion"
          type="text"
          class="input"
          v-model="tienda.direccion"
          required
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
        <label for="codPostal" class="label">Código Postal:</label>
        <input
          id="codPostal"
          type="text"
          class="input"
          v-model="tienda.codPostal"
          required
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
import { usaTiendasStore } from "@/components/stores/tiendaStore.js";

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
        !this.tienda.codPostal ||
        !this.tienda.codPostal ||
        !/^\d{5}$/.test(this.tienda.codPostal)
      );
    },
  },
  data() {
    return {
      tiendasStore: usaTiendasStore(),
    };
  },
  methods: {
    updateTienda() {
      const index = this.tiendasStore.buscarIndiceTienda(this.tienda.codTienda);
      this.tiendasStore.actualizarTienda(index, this.tienda);
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

.button-container {
  display: flex;
  justify-content: center;
  gap: 15px;
}
</style>
