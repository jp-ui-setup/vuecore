import { defineStore } from "pinia";
import { ref } from "vue";


export const useCounterStore = defineStore('counter', {
  state: ()=>{
    return({
      count: ref(0)
    })
  },
  actions: {
    increment(){
      this.count++
    },
    decrement(){
      this.count--
    },
    reset(){
      this.count = 0
    }
  }
})
