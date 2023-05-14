<template>
  <div>
    <nav class="navbar">
      <div class="container">
        <span class="navbar-text">
          El código postal de la búsqueda es: {{ codigoPostal.codigo }}
        </span>
        <button class="btn btn-primary" @click="cambiarCodigo">
          Cambiar código
        </button>
      </div>
    </nav>
  </div>
  <div class="container-fluid">
    <h2 class="titulo">Lista de productos originales y sus marcas blancas</h2>

    <div class="filtro d-flex flex-row flex-wrap align-items-center justify-content-center">
      <div class="form-group mb-2 mr-2">
        <label for="filtro-nombre" class="mr-2">Filtrar por nombre original:</label>
        <input type="text" id="filtro-nombre" v-model="filtroNombreOriginal" class="form-control" />
      </div>

      <div class="form-group mb-2 mr-2">
        <label for="filtro-marca-original" class="mr-2">Filtrar por marca original:</label>
        <input type="text" id="filtro-marca-original" v-model="filtroMarcaOriginal" class="form-control" />
      </div>
      <div class="form-group mb-2 mr-2">
        <label for="filtro-marca" class="mr-2">Filtrar por marca blanca:</label>
        <input type="text" id="filtro-marca" v-model="filtroMarca" class="form-control" />
      </div>
      <div class="form-group mb-2 mr-2">
        <label for="filtro-cat" class="mr-2">Filtrar por categoría:</label>
        <input type="text" id="filtro-cat" v-model="filtroCategoria" class="form-control" />
      </div>
      <div class="form-group mb-2 mr-2">
        <label for="filtro-tienda" class="mr-2">Filtrar por tienda:</label>
        <select id="filtro-tienda" v-model="filtroTienda" class="form-control">
          <option value="">Todas las tiendas</option>
          <option v-for="tienda in todasTiendas" :key="tienda.codTienda" :value="tienda.codTienda">
            {{ tienda.nombre }}
          </option>
        </select>
      </div>

      <div class="form-group mb-2 mr-2">
        <label for="filtro-codpostal" class="mr-2">Filtrar por código postal:</label>
        <input type="text" id="filtro-codpostal" v-model="filtroCodPostal" class="form-control" />
      </div>
    </div>

    <div class="row">
      <div class="col-md-4 mb-4" v-for="(original, index) in originalesFiltrados" :key="index">
        <div class="card">
          <div class="card-body">
            <div class="nombre-marca">
              <div>
                <h5 class="card-title">{{ original.nombre }}</h5>
                <h6 class="card-subtitle text-muted">{{ original.marca }}</h6>
              </div>
              <div>
                <h6 class="card-subtitle text-muted">{{ original.peso }} g</h6>
              </div>
            </div>
            <hr />
            <div class="row">
              <div class="col-md-3">
                <img :src="original.imagen" class="card-img-left img-thumbnail" :style="{ width: '100%' }"
                  alt="Producto original" />
              </div>
              <div class="col-md-9">
                <div v-for="tienda in tiendasOrdenadasPorPrecio(original.barras)" :key="tienda.tienda.codTienda">
                  <p v-if="!filtroTienda || tienda.tienda.codTienda === filtroTienda">
                  <div class="dato-container">
                    <div class="dato-marca">
                      <span :class="{
                        'marca-blanca': true,
                        'marca-amarilla': codigoPostalDiferencia(tienda.tienda.codPostal) === 1,
                        'marca-roja': codigoPostalDiferencia(tienda.tienda.codPostal) > 1,
                        'marca-verde': tienda.enviaOnline,
                      }" @click="mostrarModalProducto(tienda.producto)"    style="cursor: pointer;">
                        {{ tienda.producto.marca }}
                      </span>
                      <!-- ({{ tienda.tienda.nombre }}) - -->
                    </div>
                    <div class="dato-precio">
                      {{ precioPorKilogramo(tienda.producto.precio, tienda.producto.peso) }} €/Kg
                    </div>
                    <div class="dato-envio">
                      <span v-if="tienda.envio" class="text-danger">
                        + {{ tienda.envio }} € envío
                      </span>
                    </div>
                  </div>

                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="leyenda-container">
    <h5>Leyenda</h5>
    <div class="leyenda-recuadros">
      <div class="recuadro marca-blanca">
        <span>Mismo C.P</span>
      </div>
      <div class="recuadro marca-amarilla">
        <span>C.P +-1</span>
      </div>
      <div class="recuadro marca-roja">
        <span>C.P alejado</span>
      </div>
      <div class="recuadro marca-verde">
        <span>Tienda online</span>
      </div>
    </div>
  </div>
  <!-- Modal de marca blanca -->
  <div v-if="showModalProductos" class="modal" tabindex="-1" role="dialog" style="display: block">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">{{ productoSeleccionado.nombre }} - {{ productoSeleccionado.marca }}</h5>
          <button type="button" class="close" @click="showModalProductos = false">
            <span>&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-md-4">
              <img :src="productoSeleccionado.imagen" class="img-thumbnail" :style="{ width: '100%' }"
                alt="Producto de marca blanca" />
            </div>
            <div class="col-md-8">
              <h6>Peso: {{ productoSeleccionado.peso }} g</h6>
              <h6>Precio: {{ productoSeleccionado.precio }} €</h6>
              <h6>Categoría: {{ productoSeleccionado.categoria }}</h6>
              <h6>Código de barras: {{ productoSeleccionado.barras }}</h6>
              <p>Descripción: {{ productoSeleccionado.descripcion }}</p>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" @click="showModalProductos = false">Cerrar</button>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { defineComponent } from "vue";
import { usaCodPostalStore } from "@/components/stores/codPostal";
import { usaOriginalesStore } from "@/components/stores/originalesStore.js";
import { usaBlancasStore } from "@/components/stores/blancasStore.js";
import { usaTiendasStore } from "@/components/stores/tiendaStore.js";
import { usaTiendaOnlinesStore } from "@/components/stores/tiendaOnlineStore.js";
import { watch } from "vue";

export default defineComponent({
  name: "Bienvenido",
  data() {
    const originalesStore = usaOriginalesStore();
    const productosBlancasStore = usaBlancasStore();
    const tiendasFisicasStore = usaTiendasStore();
    const tiendasOnlineStore = usaTiendaOnlinesStore();
    const codPostalStore = usaCodPostalStore();

    return {
      originales: originalesStore.productos,
      productosBlanca: productosBlancasStore.productos,
      tiendasFisicas: tiendasFisicasStore.tiendas,
      tiendasOnline: tiendasOnlineStore.tiendas,
      filtroMarca: "",
      filtroCategoria: "",
      filtroTienda: "",
      filtroCodPostal: codPostalStore.codPostal.codigo,
      filtroNombre: "",
      filtroMarcaOriginal: "",
      showModalProductos: false,
      productoSeleccionado: {},
      filtroNombreOriginal: this.$route.query.filtroNombreOriginal || "",
    };
  },
  computed: {
    codigoPostal() {
      return usaCodPostalStore().codPostal;
    },
    todasTiendas() {
      return this.tiendasFisicas.concat(this.tiendasOnline);
    },
    codigoPostalDiferencia() {
      return (tiendaCodPostal) => {
        if (this.filtroCodPostal && tiendaCodPostal) {
          const diferencia = Math.abs(
            parseInt(this.filtroCodPostal) - parseInt(tiendaCodPostal)
          );
          return diferencia;
        } else {
          return null;
        }
      };
    },
    originalesFiltrados() {
  return this.originales.filter((original) => {
    const nombreOriginalCoincide = this.filtroNombreOriginal
      ? original.nombre
          .toLowerCase()
          .includes(this.filtroNombreOriginal.toLowerCase())
      : true;

        const marcaOriginalCoincide = this.filtroMarcaOriginal
          ? original.marca
            .toLowerCase()
            .includes(this.filtroMarcaOriginal.toLowerCase())
          : true;

        const categoriaCoincide = this.filtroCategoria
          ? original.categoria
            .toLowerCase()
            .includes(this.filtroCategoria.toLowerCase())
          : true;

const tiendasCoinciden = this.tiendasOrdenadasPorPrecio(original.barras).filter(
  (tienda) =>
    this.filtroTienda === "" || tienda.tienda.codTienda === this.filtroTienda
).length > 0 || this.filtroTienda === "";

        return nombreOriginalCoincide && marcaOriginalCoincide && categoriaCoincide && tiendasCoinciden;
      });
    },
  },

  methods: {
    cambiarCodigo() {
      const codPostalStore = usaCodPostalStore();
      codPostalStore.setCodPostal("");
      this.$router.push({ name: "home" });
    },
    mostrarModalProducto(producto) {
      this.productoSeleccionado = producto;
      this.showModalProductos = true;
    },
    precioPorKilogramo(precio, peso) {
      return (precio / (peso / 1000)).toFixed(2);
    },
    tiendasOrdenadasPorPrecio(barrasOriginal) {
  const tiendas = [];

  this.productosBlanca.forEach((producto) => {
    if (
      producto.barrasOriginal === barrasOriginal &&
      (!this.filtroMarca ||
        producto.marca.toLowerCase().includes(this.filtroMarca.toLowerCase()))
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
          tienda.enviaOnline = true;
        }
      }

      const coincideCodPostal =
        !this.filtroCodPostal ||
        (tienda.enviaOnline
          ? (tienda.tienda.codPostal && tienda.tienda.codPostal.includes(this.filtroCodPostal))
          : true);

      if (coincideCodPostal) {
        tiendas.push(tienda);
      }
    }
  });

  const tiendasOrdenadas = tiendas.sort((a, b) => {
    const precioA = parseFloat(
      this.precioPorKilogramo(a.producto.precio, a.producto.peso)
    );
    const precioB = parseFloat(
      this.precioPorKilogramo(b.producto.precio, b.producto.peso)
    );

    return precioA - precioB;
  });

  return tiendasOrdenadas.map((tienda) => {
    const codigoPostalDiferencia = this.codigoPostalDiferencia(tienda.tienda.codPostal);
    tienda.marcaColorClass = this.getMarcaColorClass(codigoPostalDiferencia, tienda.enviaOnline);
    return tienda;
  });
},

codigoPostalDiferencia(codPostal) {
  if (codPostal === this.filtroCodPostal) {
    return 0;
  } else if (codPostal && this.filtroCodPostal && codPostal.includes(this.filtroCodPostal)) {
    return 1;
  } else {
    return 2;
  }
},

getMarcaColorClass(codigoPostalDiferencia, enviaOnline) {
  if (codigoPostalDiferencia === 0) {
    return 'marca-blanca';
  } else if (codigoPostalDiferencia === 1) {
    return 'marca-amarilla';
  } else if (codigoPostalDiferencia > 1 && enviaOnline) {
    return 'marca-roja';
  } else {
    return 'marca-otro-color';
  }
}

  },
  created() {
    // Observa los cambios tras pulsar busca en la barra de navegacion.
    watch(
      () => this.$route.query.filtroNombreOriginal,
      (nuevoValor) => {
        this.filtroNombreOriginal = nuevoValor || "";
      }
    );
  },
});
</script>

<style>
.container {
  margin-top: 10px;
}

.navbar {
  margin-bottom: 10px;
  background-color: #f8f9fa;
}

.navbar-text {
  color: #000;
  text-align: left;
}

.titulo {
  text-align: center;
  background-color: rgb(255, 235, 205);
}

.img-thumbnail {
  object-fit: cover;
  margin-right: 10px;
}

.filtro {
  margin-bottom: 20px;
  background-color: rgb(255, 235, 205);;
}

.img-thumbnail {
  object-fit: cover;
  margin-right: 10px;
}

.marca-blanca {
  background-color: rgb(110, 233, 110);
  padding: 2px 5px;
  border-radius: 3px;
}

.marca-amarilla {
  background-color: rgb(255, 255, 105);
  padding: 2px 5px;
  border-radius: 3px;
}

.marca-roja {
  background-color: rgb(255, 113, 113);
  padding: 2px 5px;
  border-radius: 3px;
}

.marca-verde {
  background-color: rgb(106, 255, 243);
  padding: 2px 5px;
  border-radius: 3px;
}

.dato-container {
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;
}

.dato-marca {
  flex: 1;
  text-align: left;
  margin-right: 5px;
}

.dato-precio {
  flex: 1;
  text-align: center;
  margin-right: 5px;
}

.dato-envio {
  flex: 1;
  text-align: right;
}

.nombre-marca {
  display: flex;
  justify-content: space-between;
}

.nombre-marca h5,
.nombre-marca h6 {
  margin-bottom: 0;
}

.leyenda-container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 30px;
}

.leyenda-recuadros {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 15px;
  margin-top: 10px;
}

.recuadro {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 150px;
  height: 30px;
  border-radius: 5px;
  font-weight: bold;
}
.card{
  background-color:  rgb(255, 247, 234);
}
.modal-content{
  background-color:lemonchiffon
}
</style>