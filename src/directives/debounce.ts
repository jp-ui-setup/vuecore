import type { DirectiveBinding } from "vue";

export default {
  mounted(el:HTMLElement, binding: DirectiveBinding){
    const delay: number = typeof binding.arg === 'number' ? binding.arg : 500;
    let timeout: number | null = null;
    const inputEl = el as HTMLInputElement;

    el.addEventListener('input', ()=>{
      if(timeout!==null){
        clearTimeout(timeout)
      }
      timeout = window.setTimeout(() => {
        binding.value(inputEl.value)
      }, delay);
    })
  }
}
