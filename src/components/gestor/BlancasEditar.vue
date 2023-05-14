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
            <label for="precio" class="label">Precio:</label>
            <input
              id="precio"
              type="number"
              step="0.01"
              class="input"
              v-model="productoEditado.precio"
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
              length="13"
            />
          </div>
          <div class="form-control">
            <label for="categoria" class="label">Categoria: </label>
            <input
              id="categoria"
              type="text"
              class="input"
              v-model="productoEditado.categoria"
              required
            />
          </div>
          <div class="form-control">
            <label for="barrasOriginal" class="label">Código de Barras Original:</label>
            <input
              id="barrasOriginal"
              type="number"
              step="1"
              class="input"
              v-model="productoEditado.barrasOriginal"
              required
              length="13"
            />
          </div>
          <div class="form-control">
            <label for="codTienda" class="label">Código de Tienda:</label>
            <input
              id="codTienda"
              type="text"
              class="input"
              v-model="productoEditado.codTienda"
              required
            />
          </div>
          <div class="button-container">
            <button
  type="submit"
  class="btn btn-primary"
  :disabled="Incompleto"
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
    <label for="imagen" class="label">Imagen del producto:</label>
    <input
      id="imagen"
      type="file"
      class="form-control-file"
      @change="onImageChange"
    />
    <img
      v-if="productoEditado.imagen"
      :src="productoEditado.imagen"
      class="img-thumbnail mt-3"
      style="max-width: 300px"
    />
  </div>
</div>
</div>
</form>
</div>
</template>

<script>
import { defineComponent } from "vue";
import { usaBlancasStore } from "@/components/stores/blancasStore.js";
import { actualizarProductoBlanca } from "@/components/stores/blancasFirebase.js";

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
      productoEditado: { ...this.producto },
    };
  },
  computed: {
    Incompleto() {
      return (
        !this.productoEditado.nombre ||
        !this.productoEditado.marca ||
        !this.productoEditado.peso ||
        !this.productoEditado.barras ||
        !this.productoEditado.categoria ||
        !this.productoEditado.barrasOriginal ||
        !this.productoEditado.codTienda ||
        this.productoEditado.barras.toString().length !== 13
      );
    },
  },
  methods: {
    async guardarProducto() {
  const codigoBarras = this.productoEditado.barras;
  const index = this.productosStore.buscarIndiceProducto(codigoBarras);
  if (index !== -1) {
    await this.productosStore.actualizarProducto(index, this.productoEditado);
    console.log(`Actualizando producto marca blanca ${this.productoEditado.nombre}`);
  } else {
    console.error('No se encontró el producto');
  }
  this.$emit("cancel");
},
    onImageChange(event) {
      this.productoEditado.imagen = URL.createObjectURL(event.target.files[0]);
    },
  },
});
</script>

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
  width: 100%;
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
</style>

