import { defineStore } from "pinia";
import { getProductosBlanca, getProductoBlanca, agregarProductoBlanca, actualizarProductoBlanca, eliminarProductoBlanca } from './blancasFirebase';

export const usaBlancasStore = defineStore("usaBlancasStore", {
  state: () => ({
    productos: [],
  }),

  actions: {
    async cargarProductos() {
      try {
        this.productos = await getProductosBlanca();
      } catch (error) {
        console.error('Error al cargar los productos de marca blanca:', error);
      }
    },

    async agregarProducto(producto) {
      try {
        await agregarProductoBlanca(producto);
        this.productos.push(producto);
      } catch (error) {
        console.error('Error al agregar el producto de marca blanca:', error);
      }
    },

    async eliminarProducto(index) {
      try {
        const producto = this.productos[index];
        await eliminarProductoBlanca(producto.id);
        this.productos.splice(index, 1);
      } catch (error) {
        console.error('Error al eliminar el producto de marca blanca:', error);
      }
    },

    async actualizarProducto(index, productoActualizado) {
      try {
        const producto = this.productos[index];
        await actualizarProductoBlanca(producto.id, productoActualizado);
        this.productos.splice(index, 1, productoActualizado);
      } catch (error) {
        console.error('Error al actualizar el producto de marca blanca:', error);
      }
    },

    buscarIndiceProducto(codigoBarras) {
      return this.productos.findIndex(
        (producto) => producto.barras === codigoBarras
      );
    },
  },
});
