
<script>
import { defineComponent, ref } from "vue";
import { usaBlancasStore } from "@/components/stores/blancasStore.js";
import { usaTiendasStore } from "@/components/stores/tiendaStore.js";

export default defineComponent({
  components: {},
  data() {
    return {
      nombre: "",
      marca: "",
      peso: "",
      barras: "",
      categoria: "",
      descripcion: "",
      imagen: "",
      similares: [],
      similarSearch: "",
      similarProducts: [],
      productosStore: usaBlancasStore(),
      tiendasStore: usaTiendasStore(),
      showModal: false,
    };
  },
  computed: {
    incompleto() {
      return (
        !this.nombre ||
        !this.marca ||
        !this.peso ||
        !this.barras ||
        !this.categoria ||
        !this.imagen
      );
    },
  },
  methods: {
    volver() {
      this.$router.push("/blancas");
    },

    onSubmit() {
      const existeProducto = this.productosStore.productos.some(
        (producto) => producto.barras === this.barras
      );

      if (existeProducto) {
        // Mostrar el modal de advertencia
        // const modal = new bootstrap.Modal(document.getElementById("modalAdvertencia"));
        this.showModal = true;;
      } else {
        const nuevoProducto = {
          nombre: this.nombre,
          marca: this.marca,
          peso: this.peso,
          barras: this.barras,
          categoria: this.categoria,
          descripcion: this.descripcion,
          imagen: this.imagen,
          similares: this.similares,

        };
        this.productosStore.agregarProducto(nuevoProducto);

        this.nombre = "";
        this.marca = "";
        this.peso = "";
        this.barras = "";
        this.categoria = "";
        this.descripcion = "";
        this.imagen = "";
        this.similares = [];
        this.similarSearch = "";
      }
    },


    searchSimilar() {
      if (this.similarSearch === "") {
        this.similarProducts = [];
      } else {
        const searchQuery = this.similarSearch.toLowerCase();

        const similarSet = new Set(); // Conjunto para evitar duplicados
        const filteredProducts = this.productosStore.productos.filter(
          (producto) =>
            producto.nombre.toLowerCase().includes(searchQuery) ||
            producto.marca.toLowerCase().includes(searchQuery) ||
            producto.descripcion.toLowerCase().includes(searchQuery)
        );

        // Agregar productos similares y sus similares a la lista sin duplicados
        const uniqueSimilarProducts = filteredProducts.reduce(
          (result, producto) => {
            // Agregar producto similar a la lista sin duplicados
            if (!similarSet.has(producto.barras)) {
              similarSet.add(producto.barras);
              result.push(producto);
            }

            // Agregar similares del producto a la lista sin duplicados
            for (const similar of producto.similares) {
              if (!similarSet.has(similar.barras)) {
                similarSet.add(similar.barras);
                result.push(similar);
              }
            }

            return result;
          },
          []
        );

        this.similarProducts = uniqueSimilarProducts;
      }
    },


  },
});
</script>

<template>
  <div class="container">
    <div class="col-md-12 mx-auto">
      <h2 class="titulo">
        Añadir producto marca blanca
        <button class="btn btn-volver" @click="volver">Volver</button>
      </h2>
    </div>
    <div class="row">
      <div class="col-md-12 col-lg-8 mx-auto">
        <form @submit.prevent="onSubmit" class="form">
          <div class="form-control">
            <label for="nombre" class="label">Nombre:</label>
            <input id="nombre" type="text" class="input" v-model="nombre" required />
            <small class="form-text text-muted">Ejemplo: Galletas Oreo</small>
          </div>

          <div class="form-control">
            <label for="marca" class="label">Marca:</label>
            <input id="marca" type="text" class="input" v-model="marca" required />
            <small class="form-text text-muted">Ejemplo: Marca Blanca</small>
          </div>

          <div class="form-control">
            <label for="peso" class="label">Peso:</label>
            <input id="peso" type="number" class="input" v-model="peso" required />
            <small class="form-text text-muted">Ejemplo: 500g</small>
          </div>



          <div class="form-control">
            <label for="barras" class="label">Código de Barras:</label>
            <input id="barras" type="number" step="1" class="input" v-model="barras" required maxlength="13" />
            <small class="form-text text-muted">Ejemplo: Código de barras: Ej=> 8400000000000 (13
              digitos)</small>
          </div>

          <div class="form-control">
            <label for="categoria" class="label">Categoría:</label>
            <input id="categoria" type="text" class="input" v-model="categoria" required />
            <small class="form-text text-muted">Ejemplo: Galletas</small>
          </div>



          <div class="form-control">
            <label for="descripcion" class="label">Descripción:</label>
            <textarea id="descripcion" class="input" v-model="descripcion" rows="3"></textarea>
            <small class="form-text text-muted">Ejemplo: El arroz de la tienda de Diego es el mejor arroz de la
              comarca.</small>
          </div>

          <div class="form-control2">
            <label for="imagen" class="label">Introduzca la URL de la imagen del producto:</label>
            <input id="imagen" type="text" class="input" v-model="imagen" required />
            <img v-if="imagen" :src="imagen" class="img-thumbnail mt-3" style="max-width: 300px" />
            <small class="form-text text-muted">Ejemplo:
              https://imageskomparing.static-k.com/products/CAR530904551.jpg</small>
          </div>
          

          <!-- Campo similar nuevo -->
          <div class="form-control">
            <label for="similares" class="label">Productos similares:</label>
            <input id="similares" type="text" class="input" v-model="similarSearch" @input="searchSimilar" />
            <ul id="similaresList">
              <li v-for="similar in similarProducts" :key="similar.barras">
                <label>
                  <input type="checkbox" v-model="similares" :value="similar" />
                  {{ similar.nombre }} - {{ similar.marca }} - {{ similar.barras }} - {{ similar.url }}
                </label>
              </li>
            </ul>
          </div>


          <button type="submit" class="btn btn-primary" :disabled="incompleto">
            Agregar Producto
          </button>
        </form>
      </div>
    </div>
    <!-- Modal de advertencia -->

    <div v-if="showModal" class="modal" tabindex="-1" role="dialog" style="display: block">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Producto no guardado</h5>
            <button type="button" class="close" @click="showModal = false">
              <span>&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="row">

              <div class="col-md-8">
                <h6>El codigo de barras que ha introducido ya existe en la base de datos.</h6>

              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="showModal = false">Cerrar</button>
          </div>
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

.form-control2 {
  margin-bottom: 10px;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
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

.form-control-file {
  margin-top: 10px;
}

.img-thumbnail {
  margin-top: 10px;
  max-width: 100%;
  height: auto;
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
