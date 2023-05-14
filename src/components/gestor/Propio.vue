<template>
  <div class="container-fluid">
    <h2 class="titulo">Lista de productos originales y sus marcas blancas</h2>

    <div
      class="filtro d-flex flex-row flex-wrap align-items-center justify-content-center"
    >
      <div class="form-group mb-2 mr-2">
        <label for="filtro-marca" class="mr-2">Filtrar por marca blanca:</label>
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
      <div class="form-group mb-2 mr-2">
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

      <div class="form-group mb-2 mr-2">
        <label for="filtro-codpostal" class="mr-2"
          >Filtrar por código postal:</label
        >
        <input
          type="text"
          id="filtro-codpostal"
          v-model="filtroCodPostal"
          class="form-control"
        />
      </div>
    </div>

    <div class="row">
      <div
        class="col-md-4 mb-4"
        v-for="(original, index) in originalesFiltrados"
        :key="index"
      >
        <div class="card">
          <div class="card-body">
            <img
              :src="original.imagen"
              class="card-img-left img-thumbnail"
              :style="{ width: '100px', height: '100px' }"
              alt="Producto original"
            />
            <h5 class="card-title">{{ original.nombre }}</h5>
            <h6 class="card-subtitle mb-2 text-muted">{{ original.marca }}</h6>
            <hr />
            <div
              v-for="tienda in tiendasOrdenadasPorPrecio(original.barras)"
              :key="tienda.tienda.codTienda"
            >
              <p
                v-if="!filtroTienda || tienda.tienda.codTienda === filtroTienda"
              >
                {{ tienda.producto.marca }} ({{ tienda.tienda.nombre }}) -
                {{
                  precioPorKilogramo(
                    tienda.producto.precio,
                    tienda.producto.peso
                  )
                }}
                €/Kg<span v-if="tienda.envio" class="text-danger">
                  + {{ tienda.envio }} € envío</span
                >
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { usaOriginalesStore } from "@/components/stores/originalesStore.js";
import { usaBlancasStore } from "@/components/stores/blancasStore.js";
import { usaTiendasStore } from "@/components/stores/tiendaStore.js";
import { usaTiendaOnlinesStore } from "@/components/stores/tiendaOnlineStore.js";

export default defineComponent({
  data() {
    const originalesStore = usaOriginalesStore();
    const productosBlancasStore = usaBlancasStore();
    const tiendasFisicasStore = usaTiendasStore();
    const tiendasOnlineStore = usaTiendaOnlinesStore();

    return {
      originales: originalesStore.productos,
      productosBlanca: productosBlancasStore.productos,
      tiendasFisicas: tiendasFisicasStore.tiendas,
      tiendasOnline: tiendasOnlineStore.tiendas,
      filtroMarca: "",
      filtroCategoria: "",
      filtroTienda: "",
      filtroCodPostal: "",
    };
  },
  computed: {
    todasTiendas() {
      return this.tiendasFisicas.concat(this.tiendasOnline);
    },
    originalesFiltrados() {
      return this.originales.filter((original) => {
        const categoriaCoincide = this.filtroCategoria
          ? original.categoria
              .toLowerCase()
              .includes(this.filtroCategoria.toLowerCase())
          : true;

        const tiendasCoinciden = this.tiendasOrdenadasPorPrecio(
          original.barras
        ).some(
          (tienda) =>
            this.filtroTienda === "" ||
            tienda.tienda.codTienda === this.filtroTienda
        );

        return categoriaCoincide && tiendasCoinciden;
      });
    },
  },
  methods: {
    precioPorKilogramo(precio, peso) {
      return (precio / (peso / 1000)).toFixed(2);
    },
    tiendasOrdenadasPorPrecio(barrasOriginal) {
      const tiendas = [];

      this.productosBlanca.forEach((producto) => {
        if (
          producto.barrasOriginal === barrasOriginal &&
          (this.filtroMarca === "" ||
            producto.marca
              .toLowerCase()
              .includes(this.filtroMarca.toLowerCase()))
        ) {
          let tienda = {};

          tienda.producto = producto;

          const tiendaFisica = this.tiendasFisicas.find(
            (t) => t.codTienda === producto.codTienda
          );

          if (tiendaFisica) {
            tienda.tienda = tiendaFisica;
          } else {
            const tiendaOnline = this.tiendasOnline.find(
              (t) => t.codTienda === producto.codTienda
            );

            if (tiendaOnline) {
              tienda.tienda = tiendaOnline;
              tienda.envio = tiendaOnline.envio;
            }
          }

          const coincideCodPostal =
            this.filtroCodPostal === "" ||
            (tienda.tienda.codPostal &&
              tienda.tienda.codPostal.includes(this.filtroCodPostal));

          if (coincideCodPostal) {
            tiendas.push(tienda);
          }
        }
      });

      return tiendas.sort((a, b) => {
        const precioA = parseFloat(
          this.precioPorKilogramo(a.producto.precio, a.producto.peso)
        );
        const precioB = parseFloat(
          this.precioPorKilogramo(b.producto.precio, b.producto.peso)
        );

        return precioA - precioB;
      });
    },
  },
});
</script>

<style scoped>
.titulo {
  text-align: center;
  margin-top: 40px;
  background-color: blanchedalmond;
}
.img-thumbnail {
  object-fit: cover;
  margin-right: 10px;
}
.filtro {
  margin-bottom: 20px;
}
</style>
