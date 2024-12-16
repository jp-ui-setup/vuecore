<template>
  <div>
    <v-skeleton-loader v-if="isPending" type="article, article, article" :loading="isPending">
      <v-card>Loading...</v-card>
    </v-skeleton-loader>

    <v-alert v-else-if="isError" type="error" :title="error?.name">
      {{ error?.message }}
    </v-alert>

    <v-list v-else>
      <v-list-item
        v-for="articleItem in data"
        :key="articleItem.id"
        :title="articleItem.value"
        :value="articleItem.value"
      >
        <!-- Article item content -->
      </v-list-item>
    </v-list>
  </div>
</template>

<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query'
// import { ref } from 'vue'

// const users = ref()

const usersData = async () => {
  const data = await fetch('https://jsonplaceholder.typicode.com/posts')
  const res = await data.json()
  return res
}

const { isError, isPending, data, error } = useQuery({
  queryKey: ['usersList'],
  queryFn: async () => {
    const response = await usersData()
    console.log(response, 'response')
    return response.map((user) => ({
      id: user.id,
      title: user.title,
      value: user.body,
    }))
  },
})
console.log(data, 'data')
</script>
