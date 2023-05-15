import { defineStore } from "pinia";
import blancasJSON from "@/assets/productsBlancas.json";
import { getEntidades } from "@/components/stores/api-service.js";
import axios from "axios";

export const usaBlancasStore = defineStore("usaBlancasStore", {
  state: () => ({
    productos: [],
    productosCargados: false,
  }),

  actions: {
    async cargarProductos() {
      if (this.productosCargados) {
        return;
      }

      blancasJSON.forEach((producto) => {
        this.agregarProducto(producto);
      });

      return new Promise(async (resolve, reject) => {
        try {
          const response = await axios.get(
            "https://bestpricefirefire-default-rtdb.europe-west1.firebasedatabase.app/bestprice.json"
          );
          const responseData = response.data;

          if (typeof responseData === "object") {
            // Verifica si la respuesta es un objeto
            const productos = Object.values(responseData);
            productos.forEach((producto) => {
              this.agregarProducto(producto);
            });
          } else {
            console.error("No es correcto.", responseData);
          }

          this.productosCargados = true;

          resolve();
        } catch (error) {
          console.error(
            "Error al cargar productos de marcas blancas externas:",
            error
          );
          reject(error);
        }
      });
    },

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
