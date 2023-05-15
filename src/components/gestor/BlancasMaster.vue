<template>
  <div class="col-md-12 mx-auto">
    <h2 class="titulo">
      Lista de productos marca blanca
      <button class="btn btn-add" @click="irABlancas">Añadir Nuevo</button>
    </h2>
    <div
      class="filtro d-flex flex-row flex-wrap align-items-center justify-content-center"
    >
      <div class="form-group mb-2 mr-2">
        <label for="filtro-marca" class="mr-2">Filtrar por marca:</label>
        <input
          type="text"
          id="filtro-marca"
          v-model="filtroMarca"
          class="form-control"
        />
      </div>
      <div class="form-group mb-2 mr-2">
        <label for="filtro-cat" class="mr-2">Filtrar por categoría:</label>
        <input
          type="text"
          id="filtro-cat"
          v-model="filtroCategoria"
          class="form-control"
        />
      </div>
      <div class="form-group mb-2">
        <label for="ordenacion" class="mr-2">Ordenar alfabéticamente:</label>
        <select id="ordenarAlfa" v-model="orden" class="form-control">
          <option value="ascendente">Ascendente</option>
          <option value="descendente">Descendente</option>
          <option value="sin-filtros">Sin filtros</option>
        </select>
      </div>
      <div class="form-group mb-2 mr-2">
        <label for="filtro-tienda" class="mr-2"
          >Filtrar por tienda fisicas:</label
        >
        <select id="filtro-tienda" v-model="filtroTienda" class="form-control">
          <option value="">Todas las tiendas fisicas</option>
          <option
            v-for="tienda in tiendasList"
            :key="tienda.codTienda"
            :value="tienda.codTienda"
          >
            {{ tienda.nombre }}
          </option>
        </select>
      </div>
      <div class="form-group mb-2 mr-2">
        <label for="filtro-tienda-online" class="mr-2"
          >Filtrar por tienda online:</label
        >
        <select
          id="filtro-tienda-online"
          v-model="filtroTiendaOnline"
          class="form-control"
        >
          <option value="">Todas las tiendas online</option>
          <option
            v-for="tiendaOnline in tiendasOnlineList"
            :key="tiendaOnline.codTienda"
            :value="tiendaOnline.codTienda"
          >
            {{ tiendaOnline.nombre }}
          </option>
        </select>
      </div>
    </div>
    <div
      v-if="!editandoProducto"
      class="lista-productos"
      v-for="(producto, index) in productosFiltrados"
      :key="index"
    >
      <div class="row">
        <div class="col-md-2">
          <strong>Nombre: </strong>{{ producto.nombre }}
        </div>
        <div class="col-md-2"><strong>Marca: </strong>{{ producto.marca }}</div>
        <div class="col-md-2">
          <strong>Peso neto: </strong>{{ producto.peso }} gramos
        </div>
        <div class="col-md-2">
          <strong>Precio: </strong> {{ producto.precio }} €
        </div>
        <div class="col-md-2">
          <strong>Código de barras: </strong> {{ producto.barras }}
        </div>
      </div>
      <div class="row">
        <div class="col-md-2"><strong>Imagen:</strong></div>
        <div class="col-md-4">
          <img
            :src="producto.imagen"
            class="img-thumbnail"
            style="max-width: 100px"
          />
        </div>
        <div class="col-md-2">
          <strong>Categoria: </strong>{{ producto.categoria }}
        </div>
        <div class="col-md-6">
          <a class="mr-3" @click="editarProducto(buscarIndice(producto))">
            <i class="fas fa-pencil-alt"></i>
          </a>
          <a @click="eliminarProducto(buscarIndice(producto))">
            <i class="fas fa-trash-alt"></i>
          </a>
        </div>
      </div>
    </div>
    <div v-else>
      <EditarProducto
        :producto="productoEditando"
        @cancel="editandoProducto = false"
        @update="editandoProducto = false"
      />
    </div>
    <hr />
    <!-- Modal de confirmación -->
    <div
      v-if="showModal"
      class="modal"
      tabindex="-1"
      role="dialog"
      style="display: block"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-body">
            <p>
              ¿Estás seguro que deseas eliminar el producto
              {{ productoSeleccionado.nombre }} con Código
              {{ productoSeleccionado.barras }}?
            </p>
          </div>

          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-primary"
              @click="confirmarEliminar"
            >
              Aceptar
            </button>
            <button
              type="button"
              class="btn btn-secondary"
              @click="showModal = false"
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { defineComponent } from "vue";
import { usaBlancasStore } from "@/components/stores/blancasStore.js";
import EditarProducto from "./BlancasEditar.vue";
import { useRouter } from "vue-router";
import tiendas from "@/assets/tiendas.json";
import tiendasOnline from "@/assets/tiendasOnline.json";

export default defineComponent({
  components: { EditarProducto },
  data() {
    return {
      productosStore: usaBlancasStore(),
      editandoProducto: false,
      productoEditando: null,
      showModal: false,
      productoSeleccionado: null,
      indiceProducto: null,
      router: useRouter(),
      orden: "sin-filtros",
      filtroCategoria: "",
      filtroTienda: "",
      filtroMarca: "",
      filtroTiendaOnline: "",
    };
  },
  computed: {
    tiendasList() {
      return tiendas;
    },
    tiendasOnlineList() {
      return tiendasOnline;
    },
    productosFiltrados() {
      let productos = [...this.productosStore.productos];

      // Filtrar por categoría
      if (this.filtroCategoria) {
        productos = productos.filter((producto) =>
          producto.categoria
            .toLowerCase()
            .includes(this.filtroCategoria.toLowerCase())
        );
      }
      // Filtrar por marca
      if (this.filtroMarca) {
        productos = productos.filter((producto) =>
          producto.marca.toLowerCase().includes(this.filtroMarca.toLowerCase())
        );
      }
      // Filtrar por tienda
      if (this.filtroTienda) {
        productos = productos.filter(
          (producto) => producto.codTienda === this.filtroTienda
        );
      }
      // Filtrar por tienda onlínea
      if (this.filtroTiendaOnline) {
        productos = productos.filter(
          (producto) => producto.codTienda === this.filtroTiendaOnline
        );
      }
      // Ordenar productos
      switch (this.orden) {
        case "ascendente":
          productos.sort((a, b) => a.nombre.localeCompare(b.nombre));
          break;
        case "descendente":
          productos.sort((a, b) => b.nombre.localeCompare(a.nombre));
          break;
        case "sin-filtros":
          // Deja como estaban los productos inicialmente
          break;
      }

      return productos;
    },
  },
  mounted() {
    this.productosStore.cargarProductos();
  },
  methods: {
    buscarIndice(producto) {
      return this.productosStore.buscarIndiceProducto(producto.barras);
    },

    editarProducto(index) {
      this.productoEditando = this.productosStore.productos[index];
      this.editandoProducto = true;
    },
    eliminarProducto(index) {
      this.showModal = true;
      this.productoSeleccionado = this.productosStore.productos[index];
      this.indiceProducto = index;
    },
    confirmarEliminar() {
      this.productosStore.eliminarProducto(this.indiceProducto);
      this.showModal = false;
    },
    cancelarEdicion() {
      this.editandoProducto = false;
    },
    irABlancas() {
      this.router.push("/blancas/add");
    },
  },
});
</script>

<style scoped>
.lista-productos {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin-top: 30px;
  margin-left: 30px;
  background-color: beige;
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

.img-thumbnail {
  margin-top: 10px;
  max-width: 100%;
  height: auto;
}
.btn-add {
  padding: 5px 10px;
  font-size: 21px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  margin-left: 100px;
}

.btn-add:hover {
  background-color: #0069d9;
}

.filtro {
  display: flex;
  justify-content: center;
}
</style>
