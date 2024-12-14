<template>
  <div class="toc">
    <h3>Table of Contents</h3>
    <ul>
      <li v-for="(item, index) in headings" :key="index">
        <a href="#" @click.prevent="scrollToSection(item.id)" class="toc-link">{{ item.label }}</a>
      </li>
    </ul>
    <h1>Introduction</h1>
    <p>This is the introduction section.</p>
    <h2>Getting Started</h2>
    <p>This is the getting started section.</p>
    <h3>Step 1</h3>
    <p>This is step 1.</p>
    <h2>Advanced Topics</h2>
    <p>This is the advanced topics section.</p>
    <h3>Step 2</h3>
    <p>This is step 2.</p>
  </div>
  <hr />
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'

const headings = ref([])

onMounted(() => {
  const heading = [...document.querySelectorAll('h1, h2, h3, h4, h5, h6')]
  headings.value = heading.map((heading) => {
    const id = heading.id || generateID(heading.textContent)
    heading.id = id
    return {
      id: id,
      label: heading.textContent,
    }
  })
})

const scrollToSection = (id: string) => {
  const element = document.getElementById(id)
  if (element) {
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
  }
}
const generateID = (id: string) => {
  return id
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]/g, '')
}
</script>

<style scoped>
.toc {
  margin-top: 20px;
}

.toc a {
  text-decoration: none;
  color: #007bff;
}

.toc a:hover {
  text-decoration: underline;
}
</style>
