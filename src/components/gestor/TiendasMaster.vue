<script>
import { defineComponent } from "vue";
import { usaTiendasStore } from "@/components/stores/tiendaStore.js";
import EditarTienda from "./TiendasEditar.vue";
import { useRouter } from "vue-router";
import productosBlanca from "@/assets/productsBlancas.json";

export default defineComponent({
  components: { EditarTienda },
  data() {
    return {
      tiendasStore: usaTiendasStore(),
      editandoTienda: false,
      tiendaEditando: null,
      showModal: false,
      tiendaSeleccionada: null,
      indiceTienda: null,
      router: useRouter(),
      orden: "sin-filtros",
      filtroNombre: "",
      filtroCodPostal: "",
      productosFiltrados: [],
      showModalProductos: false,
    };
  },
  computed: {
    tiendasFiltradas() {
      let tiendas = [...this.tiendasStore.tiendas];

      // Filtrar por nombre
      if (this.filtroNombre) {
        tiendas = tiendas.filter((tienda) =>
          tienda.nombre.toLowerCase().includes(this.filtroNombre.toLowerCase())
        );
      }
      // // Filtrar por código postal
      // if (this.filtroCodPostal) {
      //   tiendas = tiendas.filter((tienda) =>
      //     tienda.codPostal === this.filtroCodPostal
      //   );
      // }

      // Ordenar tiendas
      switch (this.orden) {
        case "ascendente":
          tiendas.sort((a, b) => a.nombre.localeCompare(b.nombre));
          break;
        case "descendente":
          tiendas.sort((a, b) => b.nombre.localeCompare(a.nombre));
          break;
        case "sin-filtros":
          // No aplica orden
          break;
      }

      return tiendas;
    },
  },

  methods: {
    buscarIndice(tienda) {
      return this.tiendasStore.buscarIndiceTienda(tienda.codTienda);
    },
    editarTienda(index) {
      this.tiendaEditando = this.tiendasStore.tiendas[index];
      this.editandoTienda = true;
    },
    eliminarTienda(index) {
      this.showModal = true;
      this.tiendaSeleccionada = this.tiendasStore.tiendas[index];
      this.indiceTienda = index;
    },
    confirmarEliminar() {
      this.tiendasStore.eliminarTienda(this.indiceTienda);
      this.showModal = false;
    },
    cancelarEdicion() {
      this.editandoTienda = false;
    },
    irATiendas() {
      this.router.push("/fisica/add");
    },
    mostrarProductosMarcaBlanca(codTienda) {
      this.productosFiltrados = productosBlanca.filter(
        (producto) => producto.codTienda === codTienda
      );
      this.showModalProductos = true;
    },
  },
});
</script>

<template>
  <div class="col-md-12 mx-auto">
    <h2 class="titulo">
      <span class="titulo-texto">Lista de tiendas</span>
      <button class="btn btn-add" @click="irATiendas">Añadir Nueva</button>
    </h2>
    <div
      class="filtro d-flex flex-row flex-wrap align-items-center justify-content-center"
    >
      <div class="form-group mb-2 mr-2">
        <label for="filtro-cat" class="mr-2">Filtrar por nombre:</label>
        <input
          type="text"
          id="filtro-cat"
          v-model="filtroNombre"
          class="form-control"
        />
      </div>
      <!-- <div class="form-group mb-2 mr-2">
        <label for="filtro-cp" class="mr-2">Filtrar por código postal:</label>
        <input
          type="text"
          id="filtro-cp"
          v-model="filtroCodPostal"
          class="form-control"
        />
      </div> -->
      <div class="form-group mb-2">
        <label for="ordenarAlfa" class="mr-2">Ordenar alfabéticamente:</label>
        <select id="ordenarAlfa" v-model="orden" class="form-control">
          <option value="ascendente">Ascendente</option>
          <option value="descendente">Descendente</option>
          <option value="sin-filtros">Sin filtros</option>
        </select>
      </div>
    </div>
    <div v-if="!editandoTienda" class="listaTiendas">
      <div
        class="lista-tiendas card mb-3"
        v-for="(tienda, index) in tiendasFiltradas"
        :key="index"
      >
        <div class="card-header bg-success text-white">
          <h3>Tienda: {{ tienda.nombre }}</h3>
        </div>
        <div class="card-body">
          <div class="row">
            <div class="col-md-4">
              <strong>Nombre: </strong>{{ tienda.nombre }}
            </div>
            <div class="col-md-4">
              <strong>Código: </strong>{{ tienda.codTienda }}
            </div>
            <div class="col-md-4">
              <strong>Dirección: </strong>{{ tienda.direccion }}
            </div>
          </div>
          <div class="row">
            <div class="col-md-4">
              <strong>Teléfono: </strong>{{ tienda.telefono }}
            </div>
            <div class="col-md-4">
              <strong>Código Postal: </strong>{{ tienda.codPostal }}
            </div>
            <div class="col-md-4">
              <!-- <button class="btn-add m-2" @click="mostrarProductosMarcaBlanca(tienda.codTienda)">
                Mostrar productos de marca blanca
              </button> -->

              <button
                class="btn btn-primary m-2"
                @click="editarTienda(buscarIndice(tienda))"
              >
                <i class="fas fa-edit"></i>
              </button>
              <button
                class="btn btn-danger m-2"
                @click="eliminarTienda(buscarIndice(tienda))"
              >
                <i class="fas fa-trash-alt"></i>
              </button>
            </div>
            <div class="col-md-4"></div>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <EditarTienda
        :tienda="tiendaEditando"
        @cancel="editandoTienda = false"
        @update="editandoTienda = false"
      />
    </div>
    <hr />
    <!-- Modal para eliminar -->
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
              ¿Estás seguro que deseas eliminar la tienda
              {{ tiendaSeleccionada.nombre }} con Código
              {{ tiendaSeleccionada.codTienda }}?
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
    <!-- Modal para mostrar productos de marca blanca
    <div v-if="showModalProductos" class="modal" tabindex="-1" role="dialog" style="display: block">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Productos de marca blanca</h5>
            <button type="button" class="close" @click="showModalProductos = false">
              <span>&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <ul>
              <li v-for="(producto, index) in productosFiltrados" :key="index">
                {{ producto.nombre }} - {{ producto.precio }}
              </li>
            </ul>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="showModalProductos = false">
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div> -->
  </div>
</template>

<style scoped>
.lista-tiendas {
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
.lista-tiendas {
  margin-top: 30px;
}

.card-header {
  background-color: #28a745;
  color: white;
}

.card-body {
  padding: 15px;
}

.btn-add {
  padding: 5px 10px;
  font-size: 21px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.btn-add:hover {
  background-color: #28a745;
}

.filtro {
  margin-bottom: 20px;
}

.modal {
  display: block !important;
}

.modal-dialog {
  margin: 100px auto;
}

.modal-content {
  width: 400px;
}

.modal-header {
  background-color: #f8f9fa;
  padding: 10px;
  border-bottom: 1px solid #e9ecef;
}

.modal-title {
  margin: 0;
}

.close {
  font-size: 30px;
  font-weight: 700;
  line-height: 1;
  color: #000;
  text-shadow: 0 1px 0 #fff;
  opacity: 0.5;
}

.close:hover {
  color: #000;
  text-decoration: none;
  opacity: 0.75;
}

.modal-body {
  padding: 15px;
}

.modal-footer {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  background-color: #f8f9fa;
  padding: 10px;
  border-top: 1px solid #e9ecef;
}

ul {
  margin: 0;
  padding-left: 20px;
}

li {
  margin-bottom: 5px;
}
</style>
