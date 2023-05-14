import { defineStore } from "pinia";
import blancasJSON from "@/assets/productsBlancas.json";
import { getProductosBlanca, getProductoBlanca, agregarProductoBlanca, actualizarProductoBlanca, eliminarProductoBlanca } from './blancasFirebase';


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
      return this.productos.findIndex(
        (producto) => producto.barras === codigoBarras
      );
    },

    actualizarProducto(index, productoActualizado) {
      const codigoBarras = this.productos[index].barras;
      const newIndex = this.buscarIndiceProducto(codigoBarras);
      if (newIndex !== -1) {
        this.productos[newIndex] = productoActualizado;
      } else {
        console.error('No se encontró el producto');
      }
    },
  },
  
});
