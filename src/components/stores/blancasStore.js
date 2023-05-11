import { defineStore } from 'pinia';
import blancasJSON from '@/assets/productsBlancas.json';
import { db } from "@/firebase";

export const usaBlancasStore = defineStore("usaBlancasStore", {
  state: () => ({
    productos: blancasJSON,
  }),

  actions: {
    agregarProducto(producto) {
      this.productos.push(producto);
    },
    eliminarProducto(index) {
      this.productos.splice(index, 1);
    },
    buscarIndiceProducto(codigoBarras) {
      return this.productos.findIndex((producto) => producto.barras === codigoBarras);
    },

    actualizarProducto(index, productoActualizado) {
      this.productos.splice(index, 1, productoActualizado);
    },
    // async fetchData() {
    //   const dataRef = ref(db, "path/to/data");
    //   onValue(dataRef, (snapshot) => {
    //     this.$patch({ data: snapshot.val() });
    //   });
    // }
  }
});