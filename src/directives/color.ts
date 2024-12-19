

const colorDirective = {

  beforeMount(el, binding) {
    // Set the background color using the value passed to the directive
    el.style.backgroundColor = binding.value || 'yellow'; // Default to yellow if no value is provided
  },

  // Optional: You can also add the updated hook if you want to react to updates
  updated(el, binding) {
    el.style.backgroundColor = binding.value || 'yellow';
  },
};

export default colorDirective;
