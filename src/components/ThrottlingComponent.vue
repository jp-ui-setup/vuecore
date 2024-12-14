<template>
  <div>
    <h2>Method 1: Native JavaScript Throttling in Vue 3</h2>
    <input v-model="search" @input="throttleSearch" placeholder="Search..." />
    <p>Search Query: {{ search }}</p>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue'

export default defineComponent({
  setup() {
    const search = ref<string>('')
    let throttleTimeout: number | null = null
    const throttleDelay = 1000

    const throttleSearch = () => {
      if (throttleTimeout !== null) {
        clearTimeout(throttleTimeout)
      }
      throttleTimeout = window.setTimeout(() => {
        performSearch()
      }, throttleDelay)
    }
    const performSearch = () => {
      console.log('Searching for: ', search.value)
    }
    return {
      search,
      throttleSearch,
    }
  },
})
</script>
