<script>
import { defineComponent } from "vue";
import { usaTiendasStore } from "@/components/stores/tiendaStore.js";

export default defineComponent({
  props: {
    tienda: Object,
  },
  data() {
    return {
      tiendasStore: usaTiendasStore(),
      codPostal: [],
    };
  },
  computed: {
    Incompleto() {
      if (this.tienda.tipo === "fisica") {
        return (
          !this.tienda.codTienda ||
          !this.tienda.nombre ||
          !this.tienda.direccion ||
          !this.tienda.telefono ||
          !this.isValidCodPostal(this.codPostal)
        );
      } else if (this.tienda.tipo === "online") {
        return (
          !this.tienda.codTienda ||
          !this.tienda.nombre ||
          !this.tienda.envio ||
          this.tienda.minimo === 0 ||
          !this.tienda.telefono ||
          !this.isValidCodPostal(this.codPostal)
        );
      } else {
        return true;
      }
    },
  },
  mounted() {
    this.codPostal = [...this.tienda.codPostal];
  },
  methods: {
    isValidCodPostal(codPostal) {
      for (let codigo of codPostal) {
        if (!/^\d{5}$/.test(codigo)) {
          return false;
        }
      }
      return true;
    },
    addCodPostal() {
      this.codPostal.push("");
    },
    removeCodPostal(index) {
      this.codPostal.splice(index, 1);
    },
    updateTienda() {
      this.tienda.codPostal = [...this.codPostal];
      const index = this.tiendasStore.buscarIndiceTienda(this.tienda.codTienda);
      this.tiendasStore.actualizarTienda(index, this.tienda);
      this.$emit("update");
    },
  },
});
</script>

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
          readonly
        />
      </div>
      <div class="form-control">
        <label for="codTienda" class="label">Código:</label>
        <input
          id="codTienda"
          type="number"
          class="input"
          v-model="tienda.codTienda"
          readonly
        />
      </div>
      <div v-if="tienda.tipo === 'fisica'" class="form-control">
        <label for="direccion" class="label">Dirección:</label>
        <input
          id="direccion"
          type="text"
          class="input"
          v-model="tienda.direccion"
          required
        />
      </div>
      <div v-if="tienda.tipo === 'online'" class="form-control">
        <label for="envio" class="label">Gastos de envío:</label>
        <input
          id="envio"
          type="number"
          step="0.01"
          class="input"
          v-model="tienda.envio"
          required
        />
      </div>
      <div v-if="tienda.tipo === 'online'" class="form-control">
        <label for="minimo" class="label"
          >Compra mínima para envío gratuito:</label
        >
        <input
          id="minimo"
          type="number"
          step="0.01"
          class="input"
          v-model="tienda.minimo"
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
        <div class="codPostalContainer">
          <div
            v-for="(cod, index) in codPostal"
            :key="index"
            class="codPostalItem"
          >
            <input
              type="number"
              class="input codPostalInput"
              v-model="codPostal[index]"
              required
            />
            <button
              type="button"
              class="btn btn-remove"
              @click="removeCodPostal(index)"
            >
              X
            </button>
          </div>
          <button type="button" class="btn btn-add" @click="addCodPostal">
            Agregar Código Postal
          </button>
        </div>
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

.codPostalContainer {
  display: flex;
  flex-direction: column;
}

.codPostalItem {
  display: flex;
  align-items: center;
  margin-bottom: 5px;
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

.btn-remove {
  margin-left: 5px;
  background-color: #ff0000;
}

.btn-add {
  margin-top: 10px;
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
