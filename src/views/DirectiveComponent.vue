<template>
  <div v-color="'red'">Custom directive</div>
  <p>this is the man function</p>
  <p v-if="loading">Loading posts...</p>
    <p v-if="error">{{ error?.message }}</p>
    <p v-for="post in posts" :key="post.id">
   {{ post.title }}
      <p>{{ post.body }}</p>
    </p>
</template>

<script lang="ts">
import { usePosts } from '@/store/post'
import { storeToRefs } from 'pinia'
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const h = ref()

    const { posts, loading, error } = storeToRefs(usePosts())
    return {
      h,
      posts,
      loading,
      error,
    }
  },
  // directives: {
  //   color: {
  //     bind: function (el: HTMLElement, bindings: DirectiveBinding) {
  //       el.style.color = bindings.value
  //     },
  //   },
  // },
})
</script>
