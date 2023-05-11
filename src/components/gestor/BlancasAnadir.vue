<template>
    <div class="container">
      <div class="col-md-12 mx-auto">
        <h2 class="titulo">
          Añadir producto marca blanca
          <button class="btn btn-volver" @click="volver">Volver</button>
        </h2>
      </div>
      <div class="row">
        <div class="col-md-12 col-lg-6 mx-auto">
          <form @submit.prevent="onSubmit" class="form">
            <div class="form-control">
              <label for="nombre" class="label">Nombre:</label>
              <input
                id="nombre"
                type="text"
                class="input"
                v-model="nombre"
                required
              />
              <small class="form-text text-muted">Ejemplo: Galletas Oreo</small>
            </div>
  
            <div class="form-control">
              <label for="marca" class="label">Marca:</label>
              <input
                id="marca"
                type="text"
                class="input"
                v-model="marca"
                required
              />
              <small class="form-text text-muted">Ejemplo: Marca Blanca</small>
            </div>
  
            <div class="form-control">
              <label for="peso" class="label">Peso:</label>
              <input
                id="peso"
                type="text"
                class="input"
                v-model="peso"
                required
              />
              <small class="form-text text-muted">Ejemplo: 500g</small>
            </div>
  
            <div class="form-control">
              <label for="precio" class="label">Precio:</label>
              <input
                id="precio"
                type="number"
                step="0.01"
                class="input"
                v-model="precio"
                required
              />
              <small class="form-text text-muted">Ejemplo: 1.50</small>
            </div>
  
            <div class="form-control">
              <label for="barras" class="label">Código de Barras:</label>
              <input
                id="barras"
                type="number"
                step="1"
                class="input"
                v-model="barras"
                required
                length="13"
              />
              <small class="form-text text-muted"
                >Ejemplo: Código de barras marca blanca: Ej=> 8400000000000 (13 digitos)</small
              >
            </div>
  
            <div class="form-control">
              <label for="categoria" class="label">Categoría:</label>
              <input
                id="categoria"
                type="text"
                class="input"
                v-model="categoria"
                required
              />
              <small class="form-text text-muted">Ejemplo: Galletas</small>
            </div>
  
            <div class="form-control">
                <label for="barrasOriginal" class="label">
    Código de Barras Original:

  </label>
            <input
              id="barrasOriginal"
              type="number"
              step="1"
              class="input"
              v-model="barrasOriginal"
              required
              :maxlength="13"
              @input="actualizarProductoOriginal"
            />
            <small class="form-text text-muted">
              13 digitos.
            </small>
          </div>
<div class="form-control">
        <label for="codTienda" class="label">Tienda:</label>
        <select id="codTienda" class="input" v-model="codTienda" required>
          <option
            v-for="(tienda, index) in tiendasStore.tiendas"
            :key="index"
            :value="tienda.codTienda"
          >
            {{ tienda.nombre }}
          </option>
        </select>
      </div>

      <button
        type="submit"
        class="btn btn-primary"
        :disabled="Incompleto"
      >
        Agregar Producto
      </button>
    </form>
  </div>
  <div class="col-md-12 col-lg-6 mx-auto">
    <div class="form-control2">
      <label for="imagen" class="label">Imagen del producto:</label>
      <input
        id="imagen"
        type="file"
        class="form-control-file"
        @change="onImageChange"
      />
      <img
        v-if="imagen"
        :src="imagen"
        class="img-thumbnail mt-3"
        style="max-width: 300px"
      />
    </div>
  </div>
</div>
<div class="row">
  <div class="modal-body">
    <div class="col-md-12 mx-auto">
      <div
        v-for="(producto, index) in productosStore.productos"
        :key="index"
      >
        <div class="row">
          <div class="col-md-2"><strong>Nombre:</strong></div>
          <div class="col-md-4">{{ producto.nombre }}</div>
          <div class="col-md-2"><strong>Marca:</strong></div>
          <div class="col-md-4">{{ producto.marca }}</div>
        </div>
        <div class="row">
          <div class="col-md-2"><strong>Peso:</strong></div>
          <div class="col-md-4">{{ producto.peso }}</div>
          <div class="col-md-2"><strong>Precio:</strong></div>
          <div class="col-md-4">{{ producto.precio }} €</div>
        </div>
        <div class="row">
          <div class="col-md-2"><strong>Código de Barras:</strong></div>
          <div class="col-md-4">{{ producto.barras }}</div>
          <div class="col-md-2"><strong>Categoría:</strong></div>
          <div class="col-md-4">{{ producto.categoria }}</div>
        </div>
        <div class="row">
          <div class="col-md-2"><strong>Original:</strong></div>
          <div class="col-md-4">{{ producto.barrasOriginal }}</div>
          <div class="col-md-2"><strong>Tienda:</strong></div>
          <div class="col-md-4">{{ producto.codTienda }}</div>
        </div>
        <hr />
      </div>
    </div>
  </div>
</div>
</div>
</template>

<script>
import { defineComponent, ref, computed, watch, onMounted } from "vue";
import { usaBlancasStore } from "@/components/stores/blancasStore.js";
import { usaTiendasStore } from "@/components/stores/tiendaStore.js";


export default defineComponent({
  components: {},
  data() {
    return {
      nombre: "",
      marca: "",
      peso: "",
      precio: "",
      barras: "",
      categoria: "",
      imagen: "",
      barrasOriginal: "",
      codTienda: "",
      productos: [],
      productosStore: usaBlancasStore(),
      tiendasStore: usaTiendasStore(),
      
    };
  },
  computed: {
    Incompleto() {
      return (
        !this.nombre ||
        !this.marca ||
        !this.peso ||
        !this.precio ||
        !this.barras ||
        !this.categoria ||        
        !this.barrasOriginal ||
        !this.codTienda || 
        this.barras.toString().length !== 13 ||
        this.barrasOriginal.toString().length !== 13 
      );
    },
  },
 
  methods: {
    volver() {
      this.$router.push("/blancas");
    },
    
    onSubmit() {
      const nuevoProducto = {
        nombre: this.nombre,
        marca: this.marca,
        peso: this.peso,
        precio: this.precio,
        barras: this.barras,
        categoria: this.categoria,
        imagen: this.imagen,
        barrasOriginal: this.barrasOriginal,
        codTienda: this.codTienda,
      };
      this.productosStore.agregarProducto(nuevoProducto);

      this.nombre = "";
      this.marca = "";
      this.peso = "";
      this.precio = "";
      this.barras = "";
      this.categoria = "";
      this.imagen = "";
      this.barrasOriginal = "";
      this.codTienda = "";
    },
    onImageChange(event) {
      this.imagen = URL.createObjectURL(event.target.files[0]);
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

  