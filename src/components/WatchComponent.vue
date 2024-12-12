<template>
  <div class="heading">watch component</div>

  <p>
    Ask a yes/no questions:
    <input v-model="question" type="text" :disabled="laoding" />
    <input v-model="x" type="number" />
  </p>

  <p>{{ answer }}</p>

  <hr />
  <p>New question: {{ newOne }}</p>
  <p>Old Question: {{ oldOne }}</p>
</template>

<style scoped>
.heading {
  font-size: 20px;
  text-transform: uppercase;
}
</style>

<script setup lang="ts">
import { ref, watch } from 'vue'
const question = ref('')
const answer = ref('Questions usually contain a question mark. ;-)')
const laoding = ref(false)

const newOne = ref('')
const oldOne = ref('')

watch(question, async (newQuestions, oldQuestions) => {
  newOne.value = newQuestions
  oldOne.value = oldQuestions
  if (newQuestions.includes('?')) {
    laoding.value = true
    answer.value = 'Thinking....'
    try {
      const res = await fetch('https://yesno.wtf/api')
      answer.value = (await res.json()).answer
    } catch (error) {
      answer.value = 'Error! could not reach the Api. ' + error
    } finally {
      laoding.value = false
    }
  }
})

// single ref
const x = ref(0)
const y = ref(0)
watch(x, (newX) => {
  console.log(`sum of x +y is: ${newX}`)
})

// array of multiple sources

watch([x, () => y.value], ([newX, newY]) => {
  console.log(`x is ${newX} and y is ${newY}`)
})
</script>
