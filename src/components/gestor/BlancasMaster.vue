<script>
import { defineComponent } from "vue";
import { usaBlancasStore } from "@/components/stores/blancasStore.js";
import EditarProducto from "./BlancasEditar.vue";
import { useRouter } from "vue-router";
import tiendas from "@/assets/tiendas.json";

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
      tiendasList: tiendas,
    };
  },
  computed: {
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

<template>
  <h2 class="titulo">
    <span class="titulo-texto">Lista de productos marca blanca </span>
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
  </div>
  <div
    v-if="!editandoProducto"
    class="lista-productos card"
    v-for="(producto, index) in productosFiltrados"
    :key="index"
  >
    <div class="card-header bg-success text-white">
      <h5 class="card-title">{{ producto.nombre }}</h5>
    </div>
    <div class="card-body">
      <div class="row">
        <div class="col-md-3"><strong>Marca: </strong>{{ producto.marca }}</div>
        <div class="col-md-3">
          <strong>Peso: </strong>{{ producto.peso }} gramos
        </div>
        <div class="col-md-3">
          <strong>Código de barras: </strong> {{ producto.barras }}
        </div>
        <div class="col-md-3">
          <strong>Categoría: </strong>{{ producto.categoria }}
        </div>
      </div>
      <div class="row"></div>
      <div class="row">
        <div class="col-md-8">
          <strong>Similares:</strong>
          <ul>
            <li
              v-for="(similar, simIndex) in producto.similares"
              :key="simIndex"
            >
              <strong>Nombre: </strong>{{ similar.nombre }},
              <strong>Marca: </strong>{{ similar.marca }},
              <strong>Código de barras: </strong>{{ similar.barras }}
              <!-- <a :href="similar.url" target="_blank">Ver producto</a> -->
            </li>
          </ul>
        </div>
        <div class="col-md-2">
          <strong>Imagen:</strong>
          <img
            :src="producto.imagen"
            class="img-thumbnail"
            style="max-width: 100px"
          />
        </div>
        <div class="col-md-2">
          <button
            class="btn btn-primary m-2"
            @click="editarProducto(buscarIndice(producto))"
          >
            <i class="fas fa-edit"></i>
          </button>
          <button
            class="btn btn-danger m-2"
            @click="eliminarProducto(buscarIndice(producto))"
          >
            <i class="fas fa-trash-alt"></i>
          </button>
        </div>
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
        <!-- Modal de confirmación -->
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
</template>

<style scoped>
.lista-productos {
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
  text-align: center;
  margin-top: 40px;
  background-color: #e3fde3;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.titulo-texto {
  text-align: center;
  flex: 1;
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

.filtro {
  display: flex;
  justify-content: center;
}

.card-header {
  background-color: #28a745;
}

.card-title {
  margin: 0;
  color: white;
}

.card-body {
  padding: 10px;
}

.card-footer {
  background-color: #f8f9fa;
  padding: 10px;
  display: flex;
  justify-content: flex-end;
}

.img-thumbnail {
  margin-top: 10px;
  max-width: 100%;
  height: auto;
}
</style>
