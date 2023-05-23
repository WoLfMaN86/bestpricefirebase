<script>
import { defineComponent } from "vue";
import { usaBlancasStore } from "@/components/stores/blancasStore";
import { usaEstanteriaStore } from "@/components/stores/estanteriaStore";
import { usaTiendasStore } from "@/components/stores/tiendaStore";
import productsBlancas from "@/assets/productsBlancas.json";

export default defineComponent({
  name: "Bienvenido",
  data() {
    return {
      filtroNombre: "",
      filtroMarca: "",
      filtroCategoria: "",
      filtroTienda: "",
      filtroCodPostal: "",
    };
  },
  computed: {
    productosFiltrados() {
      const blancasStore = usaBlancasStore();
      return blancasStore.productos.filter((producto) => {
        const nombre = producto.nombre.toLowerCase();
        const marca = producto.marca.toLowerCase();
        const categoria = producto.categoria.toLowerCase();
        const filtro = this.filtroNombre.toLowerCase().trim().split(" ");
        const filtroMarca = this.filtroMarca.toLowerCase().trim();
        const filtroCategoria = this.filtroCategoria.toLowerCase().trim();
        const filtroTienda = this.filtroTienda;
        const filtroCodPostal = this.filtroCodPostal;

        return (
          filtro.some(
            (word) =>
              nombre.includes(word) ||
              marca.includes(word) ||
              categoria.includes(word)
          ) &&
          marca.includes(filtroMarca) &&
          (filtroCategoria === "" ||
            producto.categoria.toLowerCase().includes(filtroCategoria)) &&
          (filtroTienda === "" ||
            this.productoTieneTienda(producto.barras, filtroTienda)) &&
          (filtroCodPostal === "" ||
            this.productoEnviaACodigoPostal(producto.barras, filtroCodPostal))
        );
      });
    },
    productosSimilares() {
      const productoBuscado = this.productosFiltrados[0];
      if (productoBuscado && productoBuscado.similares) {
        return productsBlancas.filter((producto) =>
          productoBuscado.similares.some(
            (similar) => similar.barras === producto.barras
          )
        );
      }
      return [];
    },
    todasTiendas() {
      const tiendasStore = usaTiendasStore();
      return tiendasStore.tiendas;
    },
  },
  methods: {
    getTiendasProducto(barras) {
      const estanteriaStore = usaEstanteriaStore();
      return estanteriaStore.estanterias
        .filter((estanteria) => estanteria.barras === barras)
        .map((estanteria) => {
          const tiendasStore = usaTiendasStore();
          const tienda = tiendasStore.tiendas.find(
            (t) => t.codTienda === estanteria.codTienda
          );
          return {
            ...tienda,
            precio: estanteria.precio,
          };
        });
    },
    getPrecioPorKg(codTienda, producto) {
      const estanteriaStore = usaEstanteriaStore();
      const estanteria = estanteriaStore.estanterias.find(
        (e) => e.codTienda === codTienda && e.barras === producto.barras
      );

      if (estanteria && producto.peso > 0) {
        const precioKg = (estanteria.precio / producto.peso) * 1000;
        return precioKg.toFixed(2);
      }

      return null;
    },
    hasEnvio(entity) {
      return entity.hasOwnProperty("envio") && entity.envio !== null;
    },
    productoTieneTienda(barras, codTienda) {
      const estanteriaStore = usaEstanteriaStore();
      return estanteriaStore.estanterias.some(
        (estanteria) =>
          estanteria.barras === barras && estanteria.codTienda === codTienda
      );
    },
    productoEnviaACodigoPostal(barras, codPostal) {
      const estanteriaStore = usaEstanteriaStore();
      const estanteria = estanteriaStore.estanterias.find(
        (estanteria) => estanteria.barras === barras
      );
      if (estanteria) {
        const tiendasStore = usaTiendasStore();
        const tienda = tiendasStore.tiendas.find(
          (t) => t.codTienda === estanteria.codTienda
        );
        return tienda && tienda.codPostal === codPostal;
      }
      return false;
    },
  },
});
</script>

<template>
  <div>
    <h1 class="titulo">
      <span class="titulo-texto">¡Bienvenido a BestPrice!</span>
    </h1>
    <div class="filtro d-flex justify-content-center">
      <div class="form-group mb-2">
        <label for="filtro-nombre" class="mr-2"
          >¿Que producto estás buscando?</label
        >
        <input
          type="text"
          id="filtro-nombre"
          v-model="filtroNombre"
          class="form-control"
        />
      </div>
      <div class="form-group mb-2">
        <label for="filtro-marca" class="mr-2">Filtrar por marca:</label>
        <input
          type="text"
          id="filtro-marca"
          v-model="filtroMarca"
          class="form-control"
        />
      </div>
      <div class="form-group mb-2">
        <label for="filtro-categoria" class="mr-2"
          >Filtrar por categoría:</label
        >
        <input
          type="text"
          id="filtro-categoria"
          v-model="filtroCategoria"
          class="form-control"
        />
      </div>
      <div class="form-group mb-2">
        <label for="filtro-tienda" class="mr-2">Filtrar por tienda:</label>
        <select id="filtro-tienda" v-model="filtroTienda" class="form-control">
          <option value="">Todas las tiendas</option>
          <option
            v-for="tienda in todasTiendas"
            :key="tienda.codTienda"
            :value="tienda.codTienda"
          >
            {{ tienda.nombre }}
          </option>
        </select>
      </div>
      <!-- <div class="form-group mb-2">
        <label for="filtro-codpostal" class="mr-2">Filtrar por código postal:</label>
        <input
          type="text"
          id="filtro-codpostal"
          v-model="filtroCodPostal"
          class="form-control"
        />
      </div> -->
    </div>
    <hr />
    <h2 class="titulo-texto text-center">Productos buscados</h2>
    <div class="row">
      <div
        class="col-md-4 mb-4"
        v-for="producto in productosFiltrados"
        :key="producto.barras"
      >
        <div class="card">
          <div class="card-header bg-success text-white">
            <h5 class="card-title">{{ producto.nombre }}</h5>
          </div>
          <div class="card-body">
            <div class="row">
              <div class="col-md-8">
                <strong>Marca:</strong> {{ producto.marca }}
                <hr />
                <strong>Tiendas:</strong>
                <ul>
                  <li
                    v-for="tienda in getTiendasProducto(producto.barras)"
                    :key="tienda.codTienda"
                  >
                    {{ tienda.nombre }} -
                    {{ getPrecioPorKg(tienda.codTienda, producto) }} €/kg
                    <span v-if="hasEnvio(tienda)"
                      >(Envío: {{ tienda.envio }})</span
                    >
                  </li>
                </ul>
              </div>
              <div class="col-md-4">
                <strong>Peso:</strong> {{ producto.peso }} gramos
                <hr />
                <img
                  :src="producto.imagen"
                  alt="Imagen del producto"
                  class="img-thumbnail"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <hr />
    <h2 class="titulo-texto text-center">Productos similares</h2>
    <div class="row">
      <div
        class="col-md-4 mb-4"
        v-for="producto in productosSimilares"
        :key="producto.barras"
      >
        <div class="card">
          <div class="card-header bg-success text-white">
            <h5 class="card-title">{{ producto.nombre }}</h5>
          </div>
          <div class="card-body">
            <div class="row">
              <div class="col-md-8">
                <strong>Marca:</strong> {{ producto.marca }}
                <hr />
                <strong>Tiendas:</strong>
                <ul>
                  <li
                    v-for="tienda in getTiendasProducto(producto.barras)"
                    :key="tienda.codTienda"
                  >
                    {{ tienda.nombre }} -
                    {{ getPrecioPorKg(tienda.codTienda, producto) }} €/kg
                    <span v-if="hasEnvio(tienda)"
                      >(Envío: {{ tienda.envio }})</span
                    >
                  </li>
                </ul>
              </div>
              <div class="col-md-4">
                <strong>Peso:</strong> {{ producto.peso }} gramos
                <hr />
                <img
                  :src="producto.imagen"
                  alt="Imagen del producto"
                  class="img-thumbnail"
                />
              </div>
            </div>
            <div class="row">
              <div class="col-md-12">
                <!-- <strong>Similares:</strong>
                <ul>
                  <li
                    v-for="similar in producto.similares"
                    :key="similar.barras"
                  >
                    {{ similar.marca }} - <a :href="similar.url">Ver más</a>
                  </li>
                </ul> -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.titulo {
  text-align: center;
  margin-top: 40px;
  background-color: #e3fde3;
  padding: 10px;
}

.titulo-texto {
  text-align: center;
  flex: 1;
}

.filtro {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.card {
  margin-bottom: 20px;
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

.card-body .row {
  margin-bottom: 10px;
}

.card-body strong {
  margin-right: 5px;
}

.card-body ul {
  padding-left: 20px;
}

.card-body ul li {
  margin-bottom: 5px;
}

.img-thumbnail {
  margin-top: 10px;
  max-width: 100%;
  height: auto;
}
</style>
