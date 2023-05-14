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
    // guardarProducto(productoActualizado) {
    //   const index = this.productos.findIndex(
    //     (producto) => producto.id === productoActualizado.id
    //   );
    //   if (index !== -1) {
    //     this.productos[index] = { ...productoActualizado };
    //   } else {
    //     console.error('Error al guardar el producto, no se encontró el índice');
    //   }
    // },
    actualizarProducto(index, productoActualizado) {
      this.productos.splice(index, 1, productoActualizado);
    },
  },
});
