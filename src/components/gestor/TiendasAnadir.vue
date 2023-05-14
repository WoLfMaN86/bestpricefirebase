<template>
  <div class="container">
    <div class="col-md-12 mx-auto">
      <h2 class="titulo">
        Añadir Tienda
        <button class="btn btn-volver" @click="volver">Volver</button>
      </h2>
    </div>
    <div class="row">
      <div class="col-md-12 col-lg-6 mx-auto">
        <form @submit.prevent="onSubmit" class="form">
          <div class="form-control">
            <label for="codTienda" class="label">Código de Tienda:</label>
            <input
              id="codTienda"
              type="number"
              step="1"
              class="input"
              v-model="codTienda"
              required
            />
            <small class="form-text text-muted">Ejemplo: 1001</small>
          </div>
          <div class="form-control">
            <label for="nombre" class="label">Nombre:</label>
            <input
              id="nombre"
              type="text"
              class="input"
              v-model="nombre"
              required
            />
            <small class="form-text text-muted">Ejemplo: MercaDonDon</small>
          </div>
          <div class="form-control">
            <label for="direccion" class="label">Dirección:</label>
            <input
              id="direccion"
              type="text"
              class="input"
              v-model="direccion"
              required
            />
            <small class="form-text text-muted">Ejemplo: Calle falsa 123</small>
          </div>
          <div class="form-control">
            <label for="telefono" class="label">Teléfono:</label>
            <input
              id="telefono"
              type="tel"
              class="input"
              v-model="telefono"
              required
            />
            <small class="form-text text-muted">Ejemplo: 983456666</small>
          </div>
          <div class="form-control">
            <label for="codPostal" class="label">Código Postal:</label>
            <input
              id="codPostal"
              type="text"
              class="input"
              v-model="codPostal"
              required
            />
            <small class="form-text text-muted">Ejemplo: 47004</small>
          </div>
          <button
            type="submit"
            class="btn btn-primary"
            @click="onSubmit"
            :disabled="Incompleto"
          >
            Agregar Tienda
          </button>
        </form>
      </div>
    </div>
    <div class="row">
      <!-- Mostrar la lista de tiendas agregadas -->
      <div class="col-md-12 mx-auto">
        <div v-for="(tienda, index) in tiendasStore.tiendas" :key="index">
          <div class="row">
            <div class="col-md-2"><strong>Código:</strong></div>
            <div class="col-md-4">{{ tienda.codTienda }}</div>
            <div class="col-md-2"><strong>Nombre:</strong></div>
            <div class="col-md-4">{{ tienda.nombre }}</div>
          </div>
          <div class="row">
            <div class="col-md-2"><strong>Dirección:</strong></div>
            <div class="col-md-4">{{ tienda.direccion }}</div>
            <div class="col-md-2"><strong>Teléfono:</strong></div>
            <div class="col-md-4">{{ tienda.telefono }}</div>
          </div>
          <div class="row">
            <div class="col-md-2"><strong>Código Postal:</strong></div>
            <div class="col-md-4">{{ tienda.codPostal }}</div>
          </div>
          <hr />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { usaTiendasStore } from "@/components/stores/tiendaStore.js";

export default defineComponent({
  components: {},
  data() {
    return {
      codTienda: "",
      nombre: "",
      direccion: "",
      telefono: "",
      codPostal: "",
      tiendasStore: usaTiendasStore(),
    };
  },
  computed: {
    Incompleto() {
      return (
        !this.codTienda ||
        !this.nombre ||
        !this.direccion ||
        !this.telefono ||
        !this.codPostal
      );
    },
  },
  methods: {
    volver() {
      this.$router.push("/tiendas");
    },
    onSubmit() {
      const nuevaTienda = {
        codTienda: this.codTienda,
        nombre: this.nombre,
        direccion: this.direccion,
        telefono: this.telefono,
        codPostal: this.codPostal,
      };
      this.tiendasStore.agregarTienda(nuevaTienda);

      this.codTienda = "";
      this.nombre = "";
      this.direccion = "";
      this.telefono = "";
      this.codPostal = "";
    },
  },
});
</script>

<style scoped>
.container {
  max-width: 900px;
  margin: 2vw auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.title {
  font-size: 24px;
  text-align: center;
  width: 100%;
  margin-bottom: 20px;
}
.titulo {
  text-align: center;
  margin-top: 40px;
  background-color: blanchedalmond;
}
.row {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  flex-wrap: wrap;
}

.form {
  display: flex;
  flex-direction: column;
  margin-top: 20px;
}

.form-control {
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
}
.form-control2 {
  margin-bottom: 10px;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
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
.btn-volver {
  padding: 5px 10px;
  font-size: 21px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  margin-left: 100px;
}

.btn-volver:hover {
  background-color: #0069d9;
}
</style>
