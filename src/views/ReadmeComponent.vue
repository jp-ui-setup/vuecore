<template>
  <TOCComponent />
  <DebounceComponent />
  <ThrottlingComponent />
  <div v-html="parseMark"></div>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { marked } from 'marked'
import Prism from 'prismjs'
import TOCComponent from '@/components/TOCComponent.vue'
import DebounceComponent from '@/components/DebounceComponent.vue'
import ThrottlingComponent from '@/components/ThrottlingComponent.vue'
const parseMark = ref('')
const loadMarkdown = async () => {
  try {
    const response = await fetch('/README.md')
    const markdownText = await response.text() // Fetching the text content
    parseMark.value = await marked(markdownText) // Parse it to HTML
  } catch (error) {
    console.error('Error loading markdown:', error)
  }
}

onMounted(async () => {
  await loadMarkdown()
  Prism.highlightAll()
})
</script>

<style scoped>
@import 'prismjs/themes/prism.css'; /* Scoped styles for the Markdown content */
/* div {
    font-family: Arial, sans-serif;
    line-height: 1.6;
  } */

h1,
h2,
h3 {
  color: #333;
  font-size: 20px;
  font-weight: bold;
  padding: 10px 0px;
}
strong {
  font-weight: bold;
}
h4 {
  color: #333;
  font-size: 18px;
  font-weight: bold;
  padding: 10px 0px;
}
code {
  /* background-color: #f4f4f4; */
  padding: 4px;
  border-radius: 4px;
  /* color: aliceblue; */
}

.markdown-content {
  font-family: 'Courier New', monospace;
  line-height: 1.6;
}

pre {
  background-color: #2d2d2d;
  padding: 16px;
  border-radius: 4px;
  overflow: auto;
  margin: 10px 0px;
}
</style>
