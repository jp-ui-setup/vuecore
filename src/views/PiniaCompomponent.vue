<template>
  <div>Pinia</div>
  <p>Counter: {{ counter.count }}</p>
  <button @click="counter.increment">Increment</button>
  <button @click="counter.decrement">Decrement</button>
  <button class="px-4 py-2 bg-blue-500" @click="counter.reset">Reset</button>
</template>

<script setup lang="ts">
import { useCounterStore } from '@/store/useCounterStore'

const counter = useCounterStore()
</script>
