
<script>
import { defineComponent } from "vue";
import { usaTiendasStore } from "@/components/stores/tiendaStore.js";

export default defineComponent({
  components: {},
  data() {
    return {
      codTienda: "",
      nombre: "",
      tipo: "fisica",
      direccion: "",
      envio: "",
      minimo: "",
      telefono: "",
      codPostal: [],
      tiendasStore: usaTiendasStore(),
    };
  },
  computed: {
    incompleto() {
      if (this.tipo === "fisica") {
        return (
          !this.codTienda ||
          !this.nombre ||
          !this.direccion ||
          !this.telefono ||
          !this.isValidCodPostal(this.codPostal)
        );
      } else if (this.tipo === "online") {
        return (
          !this.codTienda ||
          !this.nombre ||
          !this.envio ||
          this.minimo === 0 ||
          !this.telefono ||
          !this.isValidCodPostal(this.codPostal)
        );
      } else {
        return true;
      }
    },
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
    volver() {
      this.$router.push("/tiendas");
    },
    onSubmit() {
      const nuevaTienda = {
        codTienda: this.codTienda,
        nombre: this.nombre,
        tipo: this.tipo,
        direccion: this.direccion,
        envio: this.envio,
        minimo: this.minimo,
        telefono: this.telefono,
        codPostal: this.codPostal,
      };
      this.tiendasStore.agregarTienda(nuevaTienda);

      this.codTienda = "";
      this.nombre = "";
      this.tipo = "fisica";
      this.direccion = "";
      this.envio = "";
      this.minimo = "";
      this.telefono = "";
      this.codPostal = [];
    },
    addCodPostal() {
      this.codPostal.push("");
    },
    removeCodPostal(index) {
      this.codPostal.splice(index, 1);
    },
  },
});
</script>

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
            <label for="tipo" class="label">Tipo:</label>
            <select id="tipo" class="input" v-model="tipo" required>
              <option value="fisica">Física</option>
              <option value="online">Online</option>
            </select>
          </div>
          <div v-if="tipo === 'fisica'" class="form-control">
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
          <div v-if="tipo === 'online'" class="form-control">
            <label for="envio" class="label">Gastos de envío:</label>
            <input
              id="envio"
              type="number"
              class="input"
              v-model="envio"
              required
            />
            <small class="form-text text-muted">Ejemplo: 3.99</small>
          </div>
          <div v-if="tipo === 'online'" class="form-control">
            <label for="minimo" class="label">Compra mínima para envío gratuito:</label>
            <input
              id="minimo"
              type="number"
              step="1"
              class="input"
              v-model="minimo"
              required
            />
            <small class="form-text text-muted">Ejemplo: 50 </small>
          </div>
          <div class="form-control">
            <label for="telefono" class="label">Teléfono:</label>
            <input
              id="telefono"
              type="number"
              class="input"
              v-model="telefono"
              required
            />
            <small class="form-text text-muted">Ejemplo: 983456666</small>
          </div>
          <div class="form-control">
            <label for="codPostal" class="label">Código Postal:</label>
            <div class="codPostalContainer">
              <div v-for="(cod, index) in codPostal" :key="index" class="codPostalItem">
                <input
                  type="number"
                  class="input codPostalInput"
                  v-model="codPostal[index]"
                  required
                />
                <button type="button" class="btn btn-remove" @click="removeCodPostal(index)">
                  X
                </button>
              </div>
              <button type="button" class="btn btn-add" @click="addCodPostal">
                Agregar Código Postal
              </button>
            </div>
          </div>
          <button type="submit" class="btn btn-primary" :disabled="incompleto">
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
            <div v-if="tienda.tipo === 'fisica'" class="col-md-2">
              <strong>Dirección:</strong>
            </div>
            <div v-if="tienda.tipo === 'fisica'" class="col-md-4">
              {{ tienda.direccion }}
            </div>
            <div v-if="tienda.tipo === 'online'" class="col-md-2">
              <strong>Envío:</strong>
            </div>
            <div v-if="tienda.tipo === 'online'" class="col-md-4">
              {{ tienda.envio }}
            </div>
            <div v-if="tienda.tipo === 'online'" class="col-md-2">
              <strong>Mínimo:</strong>
            </div>
            <div v-if="tienda.tipo === 'online'" class="col-md-4">
              {{ tienda.minimo }}
            </div>
          </div>
          <div class="row">
            <div class="col-md-2"><strong>Teléfono:</strong></div>
            <div class="col-md-4">{{ tienda.telefono }}</div>
            <div class="col-md-2"><strong>Código Postal:</strong></div>
            <div class="col-md-4">{{ tienda.codPostal.join(", ") }}</div>
          </div>
          <hr />
        </div>
      </div>
    </div>
  </div>
</template>


<style scoped>
.container {
  max-width: 900px;
  margin: 2vw auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
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


.codPostalContainer {
  display: flex;
  flex-direction: column;
}

.codPostalItem {
  display: flex;
  align-items: center;
  margin-bottom: 5px;
}

.btn-add {
  padding: 10px;
  font-size: 16px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.btn-remove {
  padding: 5px 8px;
  font-size: 14px;
  background-color: #dc3545;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.btn-remove:hover {
  background-color: #c82333;
}


.btn-volver {
  padding: 10px;
  font-size: 16px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.btn-volver:hover {
  background-color: #0056b3;
}

.button-container {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}
</style>
