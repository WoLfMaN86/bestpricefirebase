
<script>
import { defineComponent } from "vue";
import { usaBlancasStore } from "@/components/stores/blancasStore.js";
import { usaTiendasStore } from "@/components/stores/tiendaStore.js";

export default defineComponent({
  name: "BlancasEditar",
  props: {
    producto: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      productosStore: usaBlancasStore(),
      tiendasStore: usaTiendasStore(),
      productoEditado: { ...this.producto },
      codigoExistente: false,
      similarSearch: "",
      similarProducts: [],
    };
  },
  computed: {
    incompleto() {
      return (
        !this.productoEditado.nombre ||
        !this.productoEditado.marca ||
        !this.productoEditado.peso ||
        !this.productoEditado.barras ||
        !this.productoEditado.categoria ||
        !this.productoEditado.imagen
      );
    },
  },
  methods: {
    guardarProducto() {
      const index = this.productosStore.buscarIndiceProducto(
        this.productoEditado.barras
      );
      this.productosStore.actualizarProducto(index, this.productoEditado);
      console.log(
        `Actualizando producto marca blanca ${this.productoEditado.nombre}`
      );
      this.$emit("cancel");
    },
    searchSimilar() {
      if (this.similarSearch === "") {
        this.similarProducts = [];
      } else {
        const searchQuery = this.similarSearch.toLowerCase();
        const filteredProducts = this.productosStore.productos.filter(
          (producto) =>
            producto.nombre.toLowerCase().includes(searchQuery) ||
            producto.marca.toLowerCase().includes(searchQuery) ||
            producto.descripcion.toLowerCase().includes(searchQuery)
        );
        this.similarProducts = filteredProducts;
      }
    },
    agregarSimilar(similar) {
      if (!this.esSimilarSeleccionado(similar) && similar.barras !== this.productoEditado.barras) {
        this.productoEditado.similares.push(similar);
      }
    },
    removerSeleccionado(seleccionado) {
      const index = this.productoEditado.similares.indexOf(seleccionado);
      if (index > -1) {
        this.productoEditado.similares.splice(index, 1);
      }
    },
    esSimilarSeleccionado(similar) {
      return this.productoEditado.similares.some(
        (seleccionado) => seleccionado.barras === similar.barras
      );
    },
  },
  watch: {
    "productoEditado.barras"(newVal) {
      this.codigoExistente = this.productosStore.productos.some(
        (producto) => producto.barras === newVal
      );
    },
  },
});
</script>

<template>
  <div class="container">
    <h2 class="title">Editar Producto Marca Blanca</h2>
    <form @submit.prevent="guardarProducto" class="form">
      <div class="row">
        <div class="col-md-12 col-lg-6 mx-auto">
          <div class="form-control">
            <label for="nombre" class="label">Nombre:</label>
            <input
              id="nombre"
              type="text"
              class="input"
              v-model="productoEditado.nombre"
              required
            />
          </div>
          <div class="form-control">
            <label for="marca" class="label">Marca:</label>
            <input
              id="marca"
              type="text"
              class="input"
              v-model="productoEditado.marca"
              required
            />
          </div>
          <div class="form-control">
            <label for="peso" class="label">Peso neto:</label>
            <input
              id="peso"
              type="number"
              step="0.01"
              class="input"
              v-model="productoEditado.peso"
              required
            />
          </div>
          <div class="form-control">
            <label for="barras" class="label">Código de Barras:</label>
            <input
              id="barras"
              type="number"
              step="1"
              class="input"
              v-model="productoEditado.barras"
              required
              maxlength="13"
              :disabled="true"
            />
            <small>
             Si el código de barras no es correcto debe borrar el producto y crear uno nuevo.
            </small>
          </div>
          <div class="form-control">
            <label for="categoria" class="label">Categoría:</label>
            <input
              id="categoria"
              type="text"
              class="input"
              v-model="productoEditado.categoria"
              required
            />
          </div>
          <div class="form-control">
            <label for="descripcion" class="label">Descripción:</label>
            <textarea
              id="descripcion"
              class="input"
              v-model="productoEditado.descripcion"
              rows="3"
            ></textarea>
          </div>
          <div class="form-control">
            <label for="imagen" class="label">Imagen del producto:</label>
            <input
              id="imagen"
              type="text"
              class="input"
              v-model="productoEditado.imagen"
              required
            />
            <img
              v-if="productoEditado.imagen"
              :src="productoEditado.imagen"
              class="img-thumbnail mt-3"
              style="max-width: 300px"
            />
          </div>
          <div class="button-container">
            <button
              type="submit"
              class="btn btn-primary"
              :disabled="incompleto || codigoExistente"
            >
              Guardar
            </button>
            <button
              type="button"
              class="btn btn-secondary"
              @click="$emit('cancel')"
            >
              Cancelar
            </button>
          </div>
        </div>
        <div class="col-md-12 col-lg-6 mx-auto">
          <div class="form-control">
            <label for="similares" class="label">Productos similares:</label>
            <input
              id="similares"
              type="text"
              class="input"
              v-model="similarSearch"
              @input="searchSimilar"
            />
            <ul id="similaresList">
              <li v-for="similar in similarProducts" :key="similar.barras">
                <div class="similar-item">
                  <span>
                    {{ similar.nombre }} - {{ similar.marca }} - {{ similar.barras }} - {{ similar.url }}
                  </span>
                  <button
                    type="button"
                    @click="agregarSimilar(similar)"
                    :disabled="esSimilarSeleccionado(similar) || similar.barras === productoEditado.barras"
                  >
                    Agregar
                  </button>
                </div>
              </li>
            </ul>
          </div>
          <div class="form-control">
            <label for="seleccionados" class="label">Productos seleccionados:</label>
            <ul id="seleccionadosList">
              <li v-for="seleccionado in productoEditado.similares" :key="seleccionado.barras">
                <div class="seleccionado-item">
                  <span>
                    {{ seleccionado.nombre }} - {{ seleccionado.marca }} - {{ seleccionado.barras }} - {{ seleccionado.url }}
                  </span>
                  <button type="button" @click="removerSeleccionado(seleccionado)">
                    Remover
                  </button>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </form>
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

.title {
  font-size: 24px;
  text-align: center;
  width: 100%;
  margin-bottom: 20px;
}

.row {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  flex-wrap: wrap;
}

.col-md-6 {
  flex-basis: 48%;
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

.form-control-file {
  margin-top: 10px;
}

.img-thumbnail {
  margin-top: 10px;
  max-width: 100%;
  height: auto;
}

.button-container {
  display: flex;
  justify-content: center;
  gap: 15px;
}

.similar-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 5px;
}

.seleccionado-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 5px;
}
</style>
