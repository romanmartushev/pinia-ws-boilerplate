import { defineStore } from "pinia";

export const useProductStore = defineStore("ProductStore", {
  state: () => {
    return {
      products: [],
    };
  },
  actions: {
    async fill() {
      this.products = await fetch("/products.json")
        .then((response) => response.json())
        .then((data) => {
          return data;
        });
    },
  },
  getters: {
    productById() {
      return (id) => this.products.find((product) => product.id === id);
    },
  },
});
