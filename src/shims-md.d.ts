// src/shims-md.d.ts
declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $myGlobalProperty: string;
    $myGlobalMethod: () => void;
  }
}

declare module '*.md' {
    const content: string;
    export default content;
}

