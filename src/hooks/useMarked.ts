import { ref, reactive, computed, watch } from 'vue';
import { useMutationObserver } from '@vueuse/core';
import emojiRegexCreater from 'emoji-regex';
import { Renderer, parse } from 'marked';
import Prism from 'prismjs';
import { MarkedOptions } from 'marked';
// PrismJS themes
import tomorrow from 'prismjs/themes/prism-tomorrow.min.css?inline';
import solarized from 'prismjs/themes/prism-solarizedlight.min.css?inline';

// Creating style elements for PrismJS themes
const prismLight = document.createElement('style');
prismLight.dataset.type = 'prism-light';
prismLight.textContent = solarized;
document.head.appendChild(prismLight);

const prismDark = document.createElement('style');
prismDark.dataset.type = 'prism-dark';
prismDark.textContent = tomorrow;
document.head.appendChild(prismDark);

// Watch for light/dark theme changes and adjust PrismJS styles
useMutationObserver(
  document.head,
  (mutations) => {
    const hasCustomStyleEl_light = mutations.some((n) =>
      Array.from(n.addedNodes).includes(prismLight)
    );
    if (!hasCustomStyleEl_light) {
      document.head.appendChild(prismLight);
      prismLight.disabled =
        !document.documentElement.classList.contains('light');
    }
    const hasCustomStyleEl_dark = mutations.some((n) =>
      Array.from(n.addedNodes).includes(prismDark)
    );
    if (!hasCustomStyleEl_dark) {
      document.head.appendChild(prismDark);
      prismDark.disabled = !document.documentElement.classList.contains('dark');
    }
  },
  {
    childList: true,
  }
);

// State management
interface Anchor {
  title: string;
  href: string;
  level: number;
}

const state = reactive({
  anchorsFlat: [] as Anchor[],
  anchorsTree: computed(() => {
    const list = state.anchorsFlat;
    return list.reduce<Anchor[]>((res, cur) => {
      if (!res.length || cur.level <= res[0].level) {
        res.push({ ...cur, children: [] });
      } else {
        res[res.length - 1].children.push({ ...cur });
      }
      return res;
    }, []);
  }),
});

// Dark mode tracking
const isDark = ref<boolean>(false);
watch(isDark, (val) => {
  prismLight.disabled = val;
  prismDark.disabled = !val;
});

// Custom renderer for Marked
const renderer: MarkedOptions['renderer'] = {
  link(href: string, title: string | undefined, text: string) {
    return `<a class="ant-typography" href="${href}">${text}</a>`;
  },
  code(code: string, infostring: string, escaped: boolean) {
    // Process language for PrismJS highlighting
    const langs = infostring.split(',');
    const langsPrefix = langs
      .reduce<string[]>(
        (res, cur, i, arr) =>
          /^\s*$/.test(cur) && arr.length === 1
            ? res.concat('language-none')
            : res.concat(`language-${cur}`),
        []
      )
      .join(' ');

    const reg = /\n(?!$)/g;
    const match = code.match(reg);
    const linesNum = match ? match.length + 1 : 1;
    const lines = new Array(linesNum + 1).join('<span></span>');
    const lineNumbersWrapper = `<span aria-hidden="true" class="line-numbers-rows">${lines}</span>`;

    const md =
      langs.filter(Boolean).length && Prism.languages[langs[0]]
        ? Prism.highlight(code, Prism.languages[langs[0]], infostring)
        : code;

    return `
      <div class="code_wrap">
        <button data-type="copy">copy</button>
        <pre class="line-numbers ${langsPrefix}"><code class="${langsPrefix}">
          ${md + lineNumbersWrapper}
        </code></pre>
      </div>`;
  },
};

// Function to parse Markdown and generate HTML string
function getHtmlStr(value: string): string {
  const str = parse(
    value.replace(/^[\u200B\u200C\u200D\u200E\u200F\uFEFF]/, ''),
    {
      renderer: Object.assign(new Renderer(), renderer),
    }
  );
  return value
    ? str.replace(
        /<h(\d{1})\s{1}(?:id="([^"]*)")?[^>]*>(.*?)<\/h\1>/gim,
        (raw, level, id, text) => {
          const emojiRegex = emojiRegexCreater();

          // Remove any tag content inside headings
          const textNoTag = /^<(\w+)([^>]*)>/.test(text)
            ? text.match(/<(\w+)[^>]*>(.*?)<\/\1>/)[2].replace(/^\s*|\s*$/g, '')
            : text.replace(/<(\w+)([^>]*)>(.*?)<\/\1>/g, '');

          // Remove emoji and clean up ID
          const idNoEmoji = id
            ? id.replace(emojiRegex, '').replace(/^[\s-]*|[\s-]*$/g, '')
            : text.toLowerCase().replace(/\s+/g, '-');

          // Clean up ID attributes in heading tags
          const attrsNoId = raw
            .match(/<h\d{1}\s{1}([^>]*)>/)[1]
            .replace(/(id="([^"]+)[^"]")?/, '');

          state.anchorsFlat.push({
            title: textNoTag,
            href: '#' + idNoEmoji,
            level,
          });

          return `<h${level} ${attrsNoId} id="${idNoEmoji}" class="ant-typography">
                    <a id="user-content-${idNoEmoji}" name="${idNoEmoji}" class="anchor">
                      <span data-type="anchor" data-hash="#${idNoEmoji}" class="iconfont icon-pin"></span>
                    </a>
                    <span>${text}</span>
                  </h${level}>`;
        }
      )
    : '';
}

// Main function to process Markdown and generate content and anchors
export function useMarked(value: string = '', title: string = '.md') {
  state.anchorsFlat = [];
  const match = title.match(/^([^\.]*)|([^\.]+)$/g);
  const lang = (match[1] ?? '').replace('vue', 'html');
  const isMarkdown = /^md$/i.test(lang);
  const mdStr = isMarkdown ? value : `\`\`\`${lang}\n${value}\n\`\`\``;
  const content = getHtmlStr(mdStr);

  return {
    content,
    anchors: state.anchorsTree,
    isMarkdown,
    isDark,
  };
}
