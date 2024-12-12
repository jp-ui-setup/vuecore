<template>
  <div>hello</div>
  <p>Has published books:</p>
  <span>{{ c_lenght }}</span>
  <span>{{ fullName }}</span>
  <span>{{ calBooks() }}</span>
  <span>{{ '\n' + author.books.length }}</span>
</template>
<script setup lang="ts">
import { computed, reactive, ref } from 'vue'

const author = reactive({
  name: 'john',
  books: ['vue 1 - advanced', 'vue 3 - advanced', 'vue 2 - advanced'],
})

const firstName = ref('john')
const lastName = ref('doe')

const c_lenght = computed(() => {
  return author.books.length > 0 ? 'Yes' : 'NO'
})
function calBooks() {
  return author.books.length > 0 ? 'Yes' : 'NO'
}

const fullName = computed({
  get() {
    return firstName.value + '' + lastName.value
  },
  set(newValue) {
    ;[firstName.value, lastName.value] = newValue.split(' ')
  },
})
</script>
