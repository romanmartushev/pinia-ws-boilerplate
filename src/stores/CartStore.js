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
      const index = this.items.findIndex((item) => item.id === itemId);
      if (index !== -1) {
        this.items[index].count += count;
      } else {
        this.items.push({ id: itemId, count: count });
      }
    },
  },
});
