<script>
import { defineComponent } from "vue";

import { usaTiendasStore } from "@/components/stores/tiendaStore";
import { usaBlancasStore } from "@/components/stores/blancasStore";
import { usaEstanteriaStore } from "@/components/stores/estanteriaStore";

export default defineComponent({
  name: "PropioEditar",
  props: {
    producto: {
      type: Object,
      required: true,
    },
    tiendaSeleccionada: {
      type: Object,
      required: true,
    },
  },
  data() {
    const tiendasStore = usaTiendasStore();
    const blancasStore = usaBlancasStore();
    const estanteriaStore = usaEstanteriaStore();

    const tiendas = tiendasStore.tiendas;
    const productos = blancasStore.productos;

    const tiendaSeleccionada = tiendas.find(
      (tienda) => tienda.codTienda === this.producto?.codTienda
    );

    return {
      tiendas,
      productos,
      productoSeleccionado: {
        codTienda: this.producto ? this.producto.codTienda : "",
        barras: this.producto ? this.producto.barras : "",
        precio: this.producto ? this.producto.precio : "",
        tienda: tiendaSeleccionada ? tiendaSeleccionada.nombre : "",
      },
      editandoProducto: this.producto !== null,
    };
  },
  methods: {
    onSubmit() {
      const estanteriaStore = usaEstanteriaStore();

      const index = estanteriaStore.buscarIndiceTiendaBarras(
        this.productoSeleccionado.codTienda,
        this.productoSeleccionado.barras,
        estanteriaStore.estanterias
      );

      if (index !== -1) {
        estanteriaStore.actualizarEstanteria(index, this.productoSeleccionado);
      } else {
        estanteriaStore.agregarEstanteria(this.productoSeleccionado);
      }

      this.$emit("actualizar", this.productoSeleccionado);
    },
    cancelar() {
      this.$emit("cancelar");
    },
    volver() {
      this.$emit("cancelar");
    },
    getProductoInfo(producto) {
      return `${producto.nombre} - ${producto.marca} - ${producto.barras}`;
    },
  },
});
</script>

<template>
  <div class="container">
    <h2 class="titulo">
      Editar asociación de tienda y producto
      <button class="btn btn-volver" @click="volver">Volver</button>
    </h2>
    <div class="row">
      <div class="col-md-12 col-lg-8 mx-auto">
        <form @submit.prevent="onSubmit" class="form">
          <div class="form-control">
            <label for="tienda" class="label">Tienda:</label>
            <input
              type="text"
              id="tienda"
              class="input"
              v-model="productoSeleccionado.tienda"
              readonly
            />
          </div>
          <div class="form-control">
            <label for="producto" class="label">Producto:</label>
            <input
              type="text"
              id="producto"
              class="input"
              :value="`${producto.nombre} - ${producto.marca} - ${producto.barras}`"
              readonly
            />
          </div>
          <div class="form-control">
            <label for="precio" class="label">Precio:</label>
            <input
              type="number"
              id="precio"
              class="input"
              v-model.number="productoSeleccionado.precio"
              required
              step="0.01"
              min="0"
            />
          </div>
          <div class="form-control">
            <button type="submit" class="btn btn-primary">
              {{ editandoProducto ? "Actualizar" : "Agregar" }}
            </button>
          </div>
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
</style>
