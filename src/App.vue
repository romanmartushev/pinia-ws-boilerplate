<script setup>
import TheHeader from "@/components/TheHeader.vue";
import ProductCard from "@/components/ProductCard.vue";
import { useProductStore } from "@/stores/ProductStore";
import { useCartStore } from "@/stores/CartStore";

const cartStore = useCartStore();
const productStore = useProductStore();
productStore.fill();

cartStore.$onAction(({ name, after }) => {
  if (name === "addItem") {
    after((count) => alert(`You've added ${count} items to the cart!`));
  }
});

cartStore.$subscribe((mutation, state) => {
  localStorage.setItem("myCart", JSON.stringify(state));
});
</script>

<template>
  <div class="container">
    <TheHeader />
    <ul class="sm:flex flex-wrap lg:flex-nowrap gap-5">
      <template v-if="productStore.products.length !== 0">
        <ProductCard
          v-for="product in productStore.products"
          :key="product.id"
          :product="product"
          @addToCart="cartStore.addItem(product.id, $event)"
        />
      </template>
      <p v-else>Loading Products...</p>
    </ul>
  </div>
</template>
