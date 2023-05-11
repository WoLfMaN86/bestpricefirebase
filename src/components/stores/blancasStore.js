import { defineStore } from 'pinia';
import blancasJSON from '@/assets/productsBlancas.json';

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
    }
  }
});