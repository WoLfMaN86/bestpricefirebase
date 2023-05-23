<script>
import { defineComponent } from "vue";
import { usaEstanteriaStore } from "@/components/stores/estanteriaStore";
import { usaTiendasStore } from "@/components/stores/tiendaStore";
import { usaBlancasStore } from "@/components/stores/blancasStore";

export default defineComponent({
  name: "PropioAnadir",
  data() {
    return {
      estanteriaStore: usaEstanteriaStore(),
      tiendaStore: usaTiendasStore(),
      blancasStore: usaBlancasStore(),
      codigoBarras: null,
      tiendaSeleccionada: null,
      precio: null,
      productosDisponibles: [],
      productoSeleccionado: null,
    };
  },
  computed: {
    tiendas() {
      return this.tiendaStore.tiendas;
    },
  },
  methods: {
    onSubmit() {
      // Buscar la tienda seleccionada por su nombre
      const tienda = this.tiendaStore.tiendas.find(
        (t) => t.nombre === this.tiendaSeleccionada
      );
      if (!tienda) {
        // Manejar caso de tienda no encontrada
        return;
      }

      // Implementar la lógica para agregar la asociación de tienda y producto
      const asociacion = {
        barras: Number(this.codigoBarras),
        codTienda: tienda.codTienda,
        precio: Number(this.precio),
      };
      this.estanteriaStore.agregarEstanteria(asociacion);

      // Reiniciar los campos después de agregar
      this.codigoBarras = null;
      this.tiendaSeleccionada = null;
      this.precio = null;
      this.productoSeleccionado = null;
    },
    volver() {
      this.$router.push("/propio");
    },
    searchProductos() {
      if (this.codigoBarras) {
        this.productosDisponibles = this.blancasStore.productos.filter(
          (producto) =>
            producto.barras.toString().startsWith(this.codigoBarras.toString())
        );
      } else {
        this.productosDisponibles = [];
      }
    },
    selectProducto(producto) {
      this.codigoBarras = producto.barras.toString();
      this.productosDisponibles = [];
      this.productoSeleccionado = producto;
    },
  },
});
</script>

<template>
  <div class="container">
    <div class="col-md-12 mx-auto">
      <h2 class="titulo">
        Añadir asociación de tienda y producto
        <button class="btn btn-volver" @click="volver">Volver</button>
      </h2>
    </div>
    <div class="row">
      <div class="col-md-12 col-lg-8 mx-auto">
        <form @submit.prevent="onSubmit" class="form">
          <!-- Selección de tienda -->
          <div class="form-control">
            <label for="tienda" class="label">Tienda:</label>
            <select
              id="tienda"
              class="input"
              v-model="tiendaSeleccionada"
              required
            >
              <option
                v-for="tienda in tiendas"
                :value="tienda.nombre"
                :key="tienda.id"
              >
                {{ tienda.nombre }}
              </option>
            </select>
          </div>
          <!-- Código de barras -->
          <div class="form-control">
            <label for="codigoBarras" class="label">Código de Barras:</label>
            <input
              id="codigoBarras"
              type="number"
              class="input"
              v-model.number="codigoBarras"
              @input="searchProductos"
              required
            />
            <ul v-if="productosDisponibles.length" class="productos-list">
              <li
                v-for="producto in productosDisponibles"
                :key="producto.barras"
                @click="selectProducto(producto)"
              >
                {{ producto.nombre }} - {{ producto.marca }} ({{
                  producto.barras
                }})
              </li>
            </ul>
          </div>

          <!-- Precio -->
          <div class="form-control">
            <label for="precio" class="label">Precio:</label>
            <input
              id="precio"
              type="number"
              step="0.01"
              class="input"
              v-model.number="precio"
              required
            />
          </div>

          <button
            type="submit"
            class="btn btn-primary"
            :disabled="!codigoBarras || !productoSeleccionado"
          >
            Agregar Asociación
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  max-width: 900px;
  margin: 2vw auto;
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

.productos-list {
  list-style-type: none;
  padding: 0;
  margin-top: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f9f9f9;
}

.productos-list li {
  padding: 5px 10px;
  cursor: pointer;
}

.productos-list li:hover {
  background-color: #e6e6e6;
}
</style>
