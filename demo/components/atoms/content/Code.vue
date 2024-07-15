<template>
  <div class="ui-code">
    <span v-if="fileName" class="ui-code__file-name">{{ fileName }}</span>
    <div class="ui-code--container">
      <pre v-if="block">
      <code ref="refCode" :class="`language-${lang}`">{{ code }}<slot></slot></code>
    </pre>
      <code v-else ref="refCode" :class="`language-${lang}`"
        >{{ code }}<slot></slot
      ></code>
      <AtomsButtonCopy
        class="ui-code__icon"
        :show-label="true"
        @click="() => onCopy(code)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

import Prism from "prismjs";
import "prismjs/components/prism-typescript.js";
// import "prismjs/components/prism-tsx.js";
import "prismjs/components/prism-scss.js";

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

const refCode = ref<Element | null>(null);

watch(
  refCode,
  () => {
    if (refCode.value) {
      Prism.highlightElement(refCode.value);
    }
  },
  { flush: "post", immediate: true },
);

const onCopy = (code: string | undefined) => {
  navigator.clipboard.writeText(code ?? "");
};
</script>

<style lang="scss">
.ui {
  &-code {
    position: relative;
    width: 100%;

    $line-height: 2em;
    $tab-size: 4;

    &--container {
      position: relative;
      width: 100%;
    }

    &__file-name {
      @include use-font-size(--xs);
      @include themify($app-themes) {
        color: themed("code", "comment");
      }
      @extend %transition;
    }

    &__icon {
      position: absolute;
      top: 12px;
      right: 12px;
      cursor: pointer;
      z-index: 1;
    }

    pre {
      line-height: 0;
      @include use-themed-border("secondary");
      @include use-border-radius(--md);
    }

    code[class*="language-"] {
      line-height: $line-height;
    }

    code[class*="language-"],
    pre[class*="language-"] {
      width: 100%;
      background: none;
      font-family: "Fira Mono", Monaco, "Andale Mono", "Ubuntu Mono", monospace;
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

      @extend %transition;
      @include use-font-size(--xs);
      @include themify($app-themes) {
        color: themed("code", "text");
      }
    }

    /* Code blocks */
    pre[class*="language-"] {
      position: relative;
      background-size: 3em calc($line-height * 2);
      background-origin: content-box;
      background-attachment: local;
      margin: 0.5em 0;
      padding: 0 1em;

      background-image: linear-gradient(
        transparent 50%,
        rgba(255, 255, 255, 0.125) 50%
      );

      @include themify($app-themes) {
        background: themed("code", "background");
      }
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
      // border: 1px solid rgba(0, 0, 0, 0.1);
      display: inline;
      white-space: normal;
      background-color: #fdfdfd;
      -webkit-box-sizing: border-box;
      -moz-box-sizing: border-box;
      box-sizing: border-box;
    }

    .token {
      @extend %transition;
    }

    .token {
      &.comment,
      &.block-comment,
      &.prolog,
      &.doctype,
      &.cdata {
        @include themify($app-themes) {
          color: themed("code", "comment");
        }
      }

      &.punctuation {
        @include themify($app-themes) {
          color: themed("code", "punctuation");
        }
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
        @include themify($app-themes) {
          color: themed("code", "operator");
        }
      }

      &.atrule,
      &.attr-value,
      &.keyword,
      &.class-name {
        @include themify($app-themes) {
          color: themed("code", "keyword");
        }
      }

      &.regex,
      &.important {
        color: $c-orange;
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
