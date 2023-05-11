import { defineStore } from 'pinia';
import tiendasOnlineJSON from '@/assets/tiendasOnline.json';

export const usaTiendaOnlinesStore = defineStore("usaTiendaOnlineStore", {
  state: () => ({
    tiendas: tiendasOnlineJSON,
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
    }
  }
});