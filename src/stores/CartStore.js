import { defineStore } from "pinia";

export const useCartStore = defineStore("CartStore", {
  state: () => {
    return {
      items: [],
    };
  },
  actions: {
    addItem(itemId, count) {
      if (count === 0) {
        return;
      }
      const item = this.items.find((item) => item.id === itemId);
      if (item) {
        item.count += count;
      } else {
        this.items.push({ id: itemId, count: count });
      }
    },
  },
  getters: {
    total() {
      return this.items.reduce((prev, current) => {
        return current.count + prev;
      }, 0);
    },
    isEmpty() {
      return this.total === 0;
    },
  },
});
