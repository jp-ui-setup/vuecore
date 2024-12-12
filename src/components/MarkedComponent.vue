<template>
  hello
  <div v-html="renderedContent" class="markdown-content"></div>
</template>

<script lang="ts">
import { defineComponent, ref, watchEffect, type PropType } from 'vue'
import Prism from 'prismjs'

export default defineComponent({
  name: 'MarkdownRenderer',
  props: {
    content: {
      type: String as PropType<string>,
      required: true,
    },
  },
  setup(props) {
    const renderedContent = ref<string>('')

    // Function to parse and highlight code blocks
    const renderMarkdown = () => {
      // Parse Markdown to HTML using marked
      let htmlContent = props.content

      // Find and highlight all code blocks
      const regex = /<pre><code class="language-(\w+)">([\s\S]*?)<\/code><\/pre>/g
      htmlContent = htmlContent.replace(regex, (match, lang, code) => {
        const highlightedCode = Prism.highlight(code, lang, 'typescript')
        return `<pre><code class="language-${lang}">${highlightedCode}</code></pre>`
      })
      console.log(htmlContent)
      renderedContent.value = htmlContent
    }

    // Watch for content changes and re-render
    watchEffect(() => {
      renderMarkdown()
    })

    return {
      renderedContent,
    }
  },
})
</script>

<style scoped>
.markdown-content {
  font-family: Arial, sans-serif;
  line-height: 1.6;
}

pre {
  padding: 10px;
  background-color: #2d2d2d;
  border-radius: 5px;
  overflow-x: auto;
}

code {
  font-size: 0.95em;
}
</style>
