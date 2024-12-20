<template>
  <div>
    <h1>Product Details</h1>
    <div>
      <h3>Product Details: {{ product.name }}</h3>
      <p>Description: {{ product.description }}</p>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, onActivated, ref } from 'vue'

export default defineComponent({
  props: {
    product: Object,
  },
  setup(props) {
    const quantity = ref(1)

    const resetForm = () => {
      quantity.value = 1
    }
    const updateProduct = () => {
      console.log(`Updating product with quantity: ${quantity.value}`)
    }
    onActivated(() => {
      console.log(`Product details for ${props.product.name}`)
    })
    return {
      quantity,
      resetForm,
      updateProduct,
    }
  },
})
</script>
