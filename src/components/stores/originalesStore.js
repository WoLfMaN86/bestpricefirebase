import { defineStore } from "pinia";
import productosJSON from "@/assets/products.json";

export const usaOriginalesStore = defineStore("usaOriginalesStore", {
  state: () => ({
    productos: productosJSON,
  }),

  actions: {
    agregarProducto(producto) {
      this.productos.push(producto);
    },
    eliminarProducto(index) {
      this.productos.splice(index, 1);
    },
    buscarIndiceProducto(codigoBarras) {
      return this.productos.findIndex(
        (producto) => producto.barras === codigoBarras
      );
    },
    actualizarProducto(index, productoActualizado) {
      this.productos.splice(index, 1, productoActualizado);
    },
  },
});
