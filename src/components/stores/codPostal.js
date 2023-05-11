import { defineStore } from "pinia";

export const usaCodPostalStore = defineStore("usaCodPostalStore", {
  state: () => ({
    codPostal: "",
  }),

  actions: {
    setCodPostal(codigo) {
      this.codPostal = codigo;
    },
  },
});
