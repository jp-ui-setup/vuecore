### Real-time Example of `onActivated` and `onDeactivated` in Vue 3 with `<keep-alive>`

Let’s create a real-world scenario where `onActivated` and `onDeactivated` are useful. Imagine a scenario where you have a list of items and you want to display detailed views of each item. The detailed view should retain its state (like form inputs) when switching between items. When switching between item views, Vue caches the view using `<keep-alive>` to avoid unnecessary re-renders. When the view is activated again, you might want to fetch new data or reset some state.

#### Scenario: A Product List and Details View

In this example, we have a product list and a product details page. Each product has a detailed view, and the details page should be cached to preserve the form state (for example, a `quantity` input) when switching between products. When the component is reactivated, we may need to refetch the data (if needed) or reset certain states.

### Step 1: ProductList.vue (Main Component)

Here, we have a list of products, and when a product is clicked, it shows the details of that product. The product details component is wrapped in `<keep-alive>` to cache the component's state.

```vue
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

    <!-- Keep-alive will cache the ProductDetail component -->
    <keep-alive>
      <ProductDetail v-if="selectedProduct" :product="selectedProduct" />
    </keep-alive>
  </div>
</template>

<script>
import { ref } from 'vue'
import ProductDetail from './ProductDetail.vue'

export default {
  components: { ProductDetail },
  setup() {
    const products = ref([
      { id: 1, name: 'Product A' },
      { id: 2, name: 'Product B' },
      { id: 3, name: 'Product C' },
    ])
    const selectedProduct = ref(null)

    const selectProduct = (product) => {
      selectedProduct.value = product // When a product is clicked, show its details
    }

    return {
      products,
      selectedProduct,
      selectProduct,
    }
  },
}
</script>
```

### Step 2: ProductDetail.vue (Details Component)

This component displays the details of a selected product. It will utilize `onActivated` and `onDeactivated` hooks to perform actions when the component is activated or deactivated.

```vue
<template>
  <div>
    <h3>Product Details: {{ product.name }}</h3>
    <p>Description: {{ product.description }}</p>

    <!-- Form to update the quantity -->
    <label for="quantity">Quantity</label>
    <input v-model="quantity" type="number" id="quantity" />

    <button @click="updateProduct">Update Product</button>
  </div>
</template>

<script>
import { ref, onActivated, onDeactivated } from 'vue'

export default {
  props: {
    product: Object,
  },
  setup(props) {
    const quantity = ref(1) // Default quantity

    // When the component is activated, let's fetch data or reset state
    onActivated(() => {
      console.log(`Product details for ${props.product.name} are now active`)
      // For example, re-fetch data for the product or reset form values
      resetForm()
    })

    // When the component is deactivated, we can clean up resources
    onDeactivated(() => {
      console.log(`Product details for ${props.product.name} are now deactivated`)
      // For example, stop timers or clean up event listeners
    })

    // Function to reset form state
    const resetForm = () => {
      quantity.value = 1 // Reset the quantity to 1 when reactivated
    }

    const updateProduct = () => {
      console.log(`Updating product with quantity: ${quantity.value}`)
    }

    return {
      quantity,
      updateProduct,
    }
  },
}
</script>
```

### How It Works:

1. **Product List (ProductList.vue)**:

   - Displays a list of products. When a product is selected, the corresponding `ProductDetail` component is displayed.
   - The `ProductDetail` component is wrapped in `<keep-alive>`, so when you switch between products, the state (e.g., the quantity input) is preserved without reloading the entire component.

2. **Product Detail (ProductDetail.vue)**:

   - When the `ProductDetail` component is activated (shown), the `onActivated` hook is triggered. You can use this to perform tasks such as resetting the form, re-fetching data, or logging an event.
   - When the component is deactivated (hidden but cached), the `onDeactivated` hook is triggered. This is useful for cleanup, such as stopping a timer or clearing events.

3. **Form Handling**:
   - In this case, the `quantity` input is bound to a reactive variable (`ref`). When switching between products, this value is maintained thanks to the `keep-alive` wrapper.
   - When the component is activated again, the `quantity` resets to 1 as defined in the `resetForm` method inside the `onActivated` hook.

### Output:

- **Product Detail View**: When the user selects a product, they see its details along with an editable quantity.
- **State Preservation**: If the user switches between products, the quantity input retains its state due to the `keep-alive` caching. If you want to reset the state when the component is re-activated, you can do so in the `onActivated` hook.
- **Data Fetching**: If necessary, you can use the `onActivated` hook to fetch fresh data every time the component is activated.

### Conclusion:

This real-time example demonstrates how `onActivated` and `onDeactivated` can be useful in Vue 3 with `<keep-alive>`. These hooks help manage the state of components when they are cached and later re-activated, ensuring a smoother user experience with data fetching and form management.
