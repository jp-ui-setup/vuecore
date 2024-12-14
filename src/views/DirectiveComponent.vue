<template>
  <div v-color="'red'">Custom directive</div>
  {{ h }}
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  directives: {
    color: {
      bind: function (el, bindings) {
        el.style.color = bindings.value
      },
    },
  },
  setup() {
    const h = ref()
    return {
      h,
    }
  },
})
</script>
