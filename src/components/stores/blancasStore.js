import { defineStore } from "pinia";
import blancasJSON from "@/assets/productsBlancas.json";
import { db } from "@/firebase.js";
import { ref, set, onValue } from "firebase/database";

export const usaBlancasStore = defineStore("usaBlancasStore", {
  state: () => ({
    productos: blancasJSON,
  }),

  actions: {
    async agregarProducto(producto) {
      this.productos.push(producto);
      await set(ref(db, "productos"), this.productos);
    },
    async eliminarProducto(index) {
      this.productos.splice(index, 1);
      await set(ref(db, "productos"), this.productos);
    },
    buscarIndiceProducto(codigoBarras) {
      return this.productos.findIndex((producto) => producto.barras === codigoBarras);
    },

    async actualizarProducto(index, productoActualizado) {
      this.productos.splice(index, 1, productoActualizado);
      await set(ref(db, "productos"), this.productos);
    },
    async fetchData() {
      const dataRef = ref(db, "productos");
      onValue(dataRef, (snapshot) => {
        this.productos = snapshot.val();
      });
    }
  }
});
