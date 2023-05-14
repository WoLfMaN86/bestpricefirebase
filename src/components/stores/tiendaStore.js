import { defineStore } from "pinia";
import tiendasJSON from "@/assets/tiendas.json";

export const usaTiendasStore = defineStore("usaTiendaStore", {
  state: () => ({
    tiendas: tiendasJSON,
  }),

  actions: {
    agregarTienda(tienda) {
      this.tiendas.push(tienda);
    },
    eliminarTienda(index) {
      this.tiendas.splice(index, 1);
    },
    buscarIndiceTienda(codTienda) {
      return this.tiendas.findIndex((tienda) => tienda.codTienda === codTienda);
    },

    actualizarTienda(index, tiendaActualizado) {
      this.tiendas.splice(index, 1, tiendaActualizado);
    },
  },
});
