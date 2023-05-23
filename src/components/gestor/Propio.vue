<script>
import { defineComponent } from "vue";
import { usaEstanteriaStore } from "@/components/stores/estanteriaStore";
import { usaTiendasStore } from "@/components/stores/tiendaStore";
import { usaBlancasStore } from "@/components/stores/blancasStore";
import PropioEditar from "./PropioEditar.vue";

export default defineComponent({
  name: "Propio",
  components: {
    PropioEditar,
  },
  data() {
    return {
      estanteriaStore: usaEstanteriaStore(),
      tiendaStore: usaTiendasStore(),
      blancasStore: usaBlancasStore(),
      tiendas: [],
      productos: [],
      editandoProducto: false,
      productoEditando: null,
    };
  },
  mounted() {
    this.tiendas = this.tiendaStore.tiendas;
    this.productos = this.blancasStore.productos;
    this.editandoProducto = false;
  },
  methods: {
    getProductosPorTienda(codTienda) {
      const productosTienda = this.estanteriaStore.estanterias.filter(
        (estanteria) => estanteria.codTienda === codTienda
      );

      return productosTienda.map((estanteria) => {
        const producto = this.productos.find(
          (producto) => producto.barras === estanteria.barras
        );

        if (producto) {
          return {
            ...producto,
            precio: estanteria.precio,
          };
        } else {
          return {
            nombre: "Producto eliminado",
            marca: "N/A",
            precio: estanteria.precio,
            imagen:
              "https://thumbs.dreamstime.com/b/removed-red-rubber-stamp-over-white-background-88004540.jpg",
          };
        }
      });
    },
    editarProducto(tienda, producto) {
      const index = this.estanteriaStore.buscarIndiceTiendaBarras(
        tienda.codTienda,
        producto.barras,
        this.estanteriaStore.estanterias
      );

      if (index !== -1) {
        const asociacion = this.estanteriaStore.estanterias[index];
        this.productoEditando = {
          ...producto,
          codTienda: tienda.codTienda,
          precio: asociacion.precio,
        };
        this.editandoProducto = true;
      }
    },

    eliminarProducto(tienda, producto) {
      const index = this.estanteriaStore.buscarIndiceTiendaBarras(
        tienda.codTienda,
        producto.barras,
        this.estanteriaStore.estanterias
      );

      if (index !== -1) {
        this.estanteriaStore.eliminarEstanteria(index);
      }
    },
    cancelarEdicion() {
      this.editandoProducto = false;
      this.productoEditando = null;
    },
    actualizarProducto(productoActualizado) {
      const index = this.estanteriaStore.buscarIndiceTiendaBarras(
        productoActualizado.codTienda,
        productoActualizado.barras,
        this.estanteriaStore.estanterias
      );

      if (index !== -1) {
        this.estanteriaStore.actualizarEstanteria(index, {
          codTienda: productoActualizado.codTienda,
          barras: productoActualizado.barras,
          precio: productoActualizado.precio,
        });
      }

      this.editandoProducto = false;
      this.productoEditando = null;
    },
    irAPropioAnadir() {
      this.$router.push("/propio/add");
    },
    getTiendaSeleccionada(codTienda) {
      const tienda = this.tiendas.find(
        (tienda) => tienda.codTienda === codTienda
      );
      return tienda
        ? { ...tienda, nombre: this.getTiendaNombre(codTienda) }
        : null;
    },
    getTiendaNombre(codTienda) {
      const tienda = this.tiendas.find(
        (tienda) => tienda.codTienda === codTienda
      );
      return tienda ? tienda.nombre : "";
    },
  },
});
</script>

<template>
  <div>
    <h2 class="titulo">
      <span class="titulo-texto">Asociar Tiendas a Productos</span>
      <button class="btn btn-add" @click="irAPropioAnadir">Añadir Nuevo</button>
    </h2>
    <div v-if="!editandoProducto">
      <div
        v-for="tienda in tiendas"
        :key="tienda.codTienda"
        class="tienda-container card mb-3"
      >
        <div class="card-header bg-success text-white">
          <h3>Tienda: {{ tienda.nombre }}</h3>
        </div>
        <ul class="list-group list-group-flush">
          <li
            v-for="producto in getProductosPorTienda(tienda.codTienda)"
            :key="producto.barras"
            class="producto-container list-group-item"
          >
            <div class="d-flex justify-content-between align-items-center">
              <div>
                <div class="d-flex align-items-center">
                  <div class="d-flex flex-column">
                    <h5 class="card-title text-success">
                      {{ producto.nombre }}
                    </h5>
                    <p class="card-text">{{ producto.marca }}</p>
                  </div>
                </div>
              </div>
              <p class="card-text precio">Precio: {{ producto.precio }}</p>
              <img
                :src="producto.imagen"
                class="producto-foto"
                alt="Foto del producto"
              />
              <div class="producto-actions">
                <button
                  class="btn btn-primary m-2"
                  @click="editarProducto(tienda, producto)"
                >
                  <i class="fas fa-edit"></i>
                </button>
                <button
                  class="btn btn-danger m-2"
                  @click="eliminarProducto(tienda, producto)"
                >
                  <i class="fas fa-trash-alt"></i>
                </button>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div v-else>
      <PropioEditar
        :producto="productoEditando"
        :tiendaSeleccionada="getTiendaSeleccionada(productoEditando.codTienda)"
        @cancelar="cancelarEdicion"
        @actualizar="actualizarProducto"
      />
    </div>
  </div>
</template>

<style scoped>
.tienda-container {
  margin-top: 2vw;
  margin-left: 2vw;
  margin-right: 2vw;
  background-color: #e3fde3;
  border-radius: 5px;
  padding: 10px;
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.2);
  margin-bottom: 20px;
}
.titulo {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 40px;
  background-color: #e3fde3;
  padding: 10px;
}

.titulo-texto {
  text-align: center;
  flex: 1;
}

.tienda-container {
  margin-bottom: 20px;
}

.producto-container {
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 10px;
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.2);
  background-color: #e3fde3;
  margin-bottom: 10px;
}

.producto-container p {
  margin: 0;
}

.precio {
  font-weight: bold;
}

.btn-add {
  font-size: 21px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
.titulo .btn-add {
  display: flex;
  align-items: center;
}

.btn-add:hover {
  background-color: #0069d9;
}

.producto-foto {
  width: 80px;
  height: 80px;
  margin-right: 10px;
  object-fit: cover;
}
</style>
