import { defineStore } from "pinia";
import { useProductStore } from "@/stores/ProductStore";

export const useCartStore = defineStore("CartStore", {
  undoredo: true,
  state: () => {
    return {
      items: localStorage.getItem("myCart")
        ? JSON.parse(localStorage.getItem("myCart")).items
        : [],
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
      return count;
    },
    undo() {
      return;
    },
    redo() {
      return;
    },
  },
  getters: {
    count() {
      return this.items.reduce((prev, current) => {
        return current.count + prev;
      }, 0);
    },
    isEmpty() {
      return this.count === 0;
    },
    total() {
      const productStore = useProductStore();
      return this.items.reduce((prev, current) => {
        return (
          productStore.productById(current.id).price * current.count + prev
        );
      }, 0);
    },
  },
});
