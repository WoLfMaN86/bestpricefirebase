import { defineStore } from "pinia";
import estanteriaJSON from "@/assets/estanteria.json";

export const usaEstanteriaStore = defineStore("usaEstanteriaStore", {
  state: () => ({
    estanterias: estanteriaJSON,
  }),

  actions: {
    agregarEstanteria(estanteria) {
      this.estanterias.push(estanteria);
    },
    eliminarEstanteria(index) {
      this.estanterias.splice(index, 1);
    },
    buscarIndiceTiendaBarras(codTienda, barras, estanterias) {
      return estanterias.findIndex(
        (estanteria) =>
          estanteria.codTienda === codTienda &&
          estanteria.barras === barras
      );
    },

    actualizarEstanteria(index, estanteriaActualizado) {
      this.estanterias.splice(index, 1, estanteriaActualizado);
    },
  },
});
