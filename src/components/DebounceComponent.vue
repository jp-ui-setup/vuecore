<template>
  <div class="heading my-5">Debounce with Native JavaScript in Vue 3 + TypeScript</div>
  <input type="text" v-model="search" @input="debouncedSearch" placeholder="Type to search..." />
  <p class="my-5">Search Query: {{ search }}</p>

  <input v-debounce:500="debouncedSearchDirective" placeholder="Type to search..." />
  <hr />
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import debounceDirective from '@/directives/debounce'
export default defineComponent({
  directives: {
    debounce: debounceDirective,
  },
  setup() {
    const search = ref<string>('')
    let debounceTimeout: number | null = null
    const debouncedSearch = () => {
      if (debounceTimeout !== null) {
        clearTimeout(debounceTimeout)
      }

      debounceTimeout = window.setTimeout(() => {
        performSearch()
      }, 500)
    }
    // const debouncedSearch2 = debounce(() => {
    //   performSearch()
    // }, 500)

    const debouncedSearchDirective = (query: string) => {
      search.value = query
      console.log('Searching for:', query)
    }
    const performSearch = () => {
      console.log(`searching for: `, search.value)
    }
    return {
      search,
      debouncedSearch,
      debouncedSearchDirective,
    }
  },
})
</script>
<style scoped>
.heading {
  font-size: 30px;
}
input {
  border: 1px solid;
  padding: 10px;
  margin: 10px 0px;
}
</style>
