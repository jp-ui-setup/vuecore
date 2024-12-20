<template>
  <div>
    <h2>Product List</h2>
    <ul>
      <li v-for="product in products" :key="product.id">
        <button @click="selectProduct(product)">
          {{ product.name }}
        </button>
      </li>
    </ul>
    <KeepAlive>
      <DetailComponent v-if="selectedProduct" :product="selectedProduct" />
    </KeepAlive>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import DetailComponent from './DetailComponent.vue'
// const props = defineProps({
//   product: Object,
// })
const products = ref([
  { id: 1, name: 'Product A' },
  { id: 2, name: 'Product B' },
  { id: 3, name: 'Product C' },
])
const selectedProduct = ref(null)

const selectProduct = (product: any) => {
  selectedProduct.value = product
}
</script>
