// useCodeHighlight.ts
import { ref, onMounted, watch } from 'vue';
import Prism from 'prismjs';
import 'prismjs/components/prism-typescript'; // Import TypeScript language support
// import 'prismjs/themes/prism-tomorrow.min.css'; // Import theme for the code highlighting (optional)

export function useCodeHighlight(code: string) {
  const highlightedCode = ref('');

  // Function to highlight the code using PrismJS
  const highlightCode = () => {
    highlightedCode.value = Prism.highlight(code, Prism.languages.typescript, 'typescript');
  };

  // Run the highlight code on component mount and whenever the code changes
  onMounted(() => {
    highlightCode();
  });

  // Watch for code changes and highlight again
  watch(code, () => {
    highlightCode();
  });

  return {
    highlightedCode,
  };
}
