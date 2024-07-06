<template>
  <div class="ui-code">
    <span v-if="fileName" class="file-name">{{ fileName }}</span>
    <pre v-if="block">
    <code ref="refCode" :lang :class="`language-${lang}`">{{ code }}<slot></slot></code>
  </pre>
    <code v-else ref="refCode" :lang :class="`language-${lang}`"
      >{{ code }}<slot></slot
    ></code>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

import Prism from "prismjs";
import "prismjs/components/prism-typescript";

interface Props {
  lang: string;
  code?: string;
  fileName?: string;
  block?: boolean;
}

withDefaults(defineProps<Props>(), {
  lang: "ts",
  codeBlock: false,
});

const refCode = ref<HTMLPreElement | null>(null);

watch(
  refCode,
  () => {
    if (refCode.value) {
      Prism.highlightElement(refCode.value);
    }
  },
  { flush: "post", immediate: true },
);
</script>

<style lang="scss">
.ui {
  &-code {
    width: 100%;

    $line-height: 2em;
    $tab-size: 4;

    .file-name {
      color: #9f9f9f;
      padding: 0 1em;
      @include use-font-size(--sm);
    }

    pre {
      line-height: 0;
      border: 1px solid #e7ecf4;
      @include use-border-radius(--md);
    }

    code[class*="language-"] {
      line-height: $line-height;
    }

    code[class*="language-"],
    pre[class*="language-"] {
      width: 100%;
      color: $c-black;
      background: none;
      font-family: "Fira Mono", Monaco, "Andale Mono", "Ubuntu Mono", monospace;
      @include use-font-size(--xs);

      text-align: left;
      white-space: break-spaces;
      word-spacing: normal;
      word-break: normal;
      word-wrap: normal;

      -moz-tab-size: $tab-size;
      -o-tab-size: $tab-size;
      tab-size: $tab-size;

      -webkit-hyphens: none;
      -moz-hyphens: none;
      -ms-hyphens: none;
      hyphens: none;
    }

    /* Code blocks */
    pre[class*="language-"] {
      position: relative;
      background-color: #ffffff;
      background-image: linear-gradient(
        transparent 50%,
        rgba(0, 0, 0, 0.025) 50%
      );
      background-size: 3em calc($line-height * 2);
      background-origin: content-box;
      background-attachment: local;
      margin: 0.5em 0;
      padding: 0 1em;
    }

    pre[class*="language-"] > code {
      display: block;
    }

    /* Inline code */
    :not(pre) > code[class*="language-"] {
      position: relative;
      padding: 0.2em;
      border-radius: 0.3em;
      color: $c-red;
      border: 1px solid rgba(0, 0, 0, 0.1);
      display: inline;
      white-space: normal;
      background-color: #fdfdfd;
      -webkit-box-sizing: border-box;
      -moz-box-sizing: border-box;
      box-sizing: border-box;
    }

    .token {
      &.comment,
      &.block-comment,
      &.prolog,
      &.doctype,
      &.cdata {
        color: #7d8b99;
      }

      &.punctuation {
        color: #5f6364;
      }

      &.property,
      &.tag,
      &.boolean,
      &.number,
      &.function-name,
      &.constant,
      &.symbol,
      &.deleted {
        color: $c-red;
      }

      &.selector,
      &.attr-name,
      &.string,
      &.char,
      &.function,
      &.builtin,
      &.inserted {
        color: $c-green;
      }

      &.operator,
      &.entity,
      &.url,
      &.variable {
        color: #a67f59;
        background: rgba(255, 255, 255, 0.5);
      }

      &.atrule,
      &.attr-value,
      &.keyword,
      &.class-name {
        color: darken($c-accent, 9%);
      }

      &.regex,
      &.important {
        color: #e90;
      }

      &.important {
        font-weight: normal;
      }

      &.bold {
        font-weight: bold;
      }

      &.italic {
        font-style: italic;
      }

      &.entity {
        cursor: help;
      }

      &.namespace {
        // opacity: 0.6;
        color: darken($c-green, 9%);
      }
    }

    .language-css,
    .style {
      &.token.string {
        color: #a67f59;
        background: rgba(255, 255, 255, 0.5);
      }
    }
  }
}
</style>
