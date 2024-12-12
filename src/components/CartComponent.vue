<script setup lang="ts">
import { computed, ref } from 'vue'

interface Product {
  id: number
  name: string
  price: number
  quantity: number
}

const items = ref<Product[]>([
  { id: 1, name: 'John Doe', price: 10, quantity: 1 },
  { id: 2, name: 'Jane Smith', price: 20, quantity: 2 },
])

const product = ref('')

const addToCart = () => {
  if (product.value) {
    const prdt: Product = {
      id: items.value.length,
      name: product.value,
      price: 30,
      quantity: 1,
    }

    items.value.push(prdt)
    product.value = ''
  }
}

const removeItem = (id: number) => {
  items.value = items.value.filter((prod) => prod.id !== id)
}
const updateQuantity = (id: number, quantity: number) => {
  const cartItem = items.value.find((item) => item.id == id)
  if (cartItem) {
    if (quantity <= 0) {
      removeItem(id)
    } else {
      cartItem.quantity = quantity
    }
  }
}
const clearCart = () => {
  items.value = []
}

const totalPrice = computed(() => {
  return items.value
    .reduce((total, item) => {
      return total + item.price * item.quantity
    }, 0)
    .toFixed(2)
})
</script>

<template>
  <div>
    <h1>Cart example</h1>

    <h2>Cart Product List:</h2>

    <ul>
      <li v-for="product in items" :key="product.id">
        <div>{{ product.name }} - {{ product.price }} Quantity: {{ product.quantity }}</div>

        <button @click="removeItem(product.id)">Remove</button>
        <button @click="updateQuantity(product.id, product.quantity + 1)">+</button>
        <button @click="updateQuantity(product.id, product.quantity - 1)">-</button>
      </li>
      <li>
        Total
        <span>{{ totalPrice }} <button @click="clearCart">Clear Cart</button></span>
      </li>
    </ul>
    <div class="input-box">
      <h2>Add new product:</h2>
      <input type="text" placeholder="Enter prodcut..." v-model="product" />
      <button @click="addToCart">Add new item</button>
    </div>
  </div>
</template>

<style scoped>
ul {
  width: 600px;
  background-color: bisque;
  font-size: 16px;
  padding: 0px;

  && li {
    display: flex;
    justify-content: space-between;
    margin: 2px 0px;
    background-color: aliceblue;
    padding: 5px 4px;
    align-items: center;

    && button {
      border: none;
      background-color: brown;
      padding: 10px 20px;
      margin: 3px;
      color: aliceblue;
      cursor: pointer;
    }
  }
}
.input-box {
  margin: 15px 0px;
  display: flex;
  justify-content: space-between;
  && input {
    padding: 10px;
    font-size: 16px;
    width: 100%;
  }
  && button {
    padding: 10px 20px;
    background-color: cadetblue;
    font-size: 16px;
    text-transform: capitalize;
    border: none;
    margin: 0px 4px;
    cursor: pointer;
  }
}
</style>
