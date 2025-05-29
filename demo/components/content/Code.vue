<script setup lang="ts">
import { ref, watch } from "vue";
import Prism from "prismjs";
import "prismjs/components/prism-typescript.js";
import "prismjs/components/prism-scss.js";

import CopyButton from "@/components/controls/CopyButton.vue";

interface Props {
  lang?: string;
  code?: string;
  fileName?: string;
  block?: boolean;
}

withDefaults(defineProps<Props>(), {
  lang: "ts",
  codeBlock: false,
});

const refCode = ref<Element | null>();

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

<template>
  <div class="ui-code">
    <span v-if="fileName" class="ui-code__file-name">/* {{ fileName }} */</span>
    <div class="ui-code__container">
      <pre v-if="block">
      <code ref="refCode" :class="`language-${lang}`">{{ code }}<slot></slot></code>
    </pre>
      <code v-else ref="refCode" :class="`language-${lang}`"
        >{{ code }}
        <slot></slot>
      </code>
      <CopyButton
        v-if="refCode"
        class="ui-code__clipboard-icon"
        :show-label="true"
        @click="() => onCopy(code)"
      />
    </div>
  </div>
</template>

<style lang="scss">
@use "sass:map";

.ui {
  &-code {
    position: relative;
    width: 100%;
    height: 100%;

    $line-height: map.get($codeBlock, "lineHeight");
    $tab-size: map.get($codeBlock, "tabSize");

    &__container {
      position: relative;
      width: 100%;
      height: 100%;
      min-height: 100%;
    }

    &__file-name {
      position: absolute;
      top: map.get($spacing, "xxs");
      left: map.get($spacing, "md");
      @extend %t__code__2;
      @include themify($themes) {
        color: themed("code", "filename");
      }
      @extend %base-transition;
      z-index: 2;
    }

    &__clipboard-icon {
      position: absolute;
      top: px2rem(map.get($spacing, "sm"));
      right: px2rem(map.get($spacing, "sm"));
      cursor: pointer;
      z-index: 1;
    }

    pre {
      line-height: 0;
      @include use-themed-border("secondary");
    }

    code[class*="language-"] {
      line-height: $line-height;
    }

    code[class*="language-"],
    pre[class*="language-"] {
      width: 100%;
      min-height: 100%;
      background: none;
      font-family: map.get($font-family, "secondary");
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

      @extend %base-transition;
      @extend %t__code__1;
      @include themify($themes) {
        color: themed("code", "base");
      }
    }

    /* Code blocks */
    pre[class*="language-"] {
      position: relative;
      background-size: 3em calc($line-height * 2);
      background-origin: content-box;
      background-attachment: local;
      margin: 0;
      @include padding(left top bottom, px2em(map.get($spacing, "md")));

      background-image: linear-gradient(
        transparent 50%,
        rgba(255, 255, 255, 0.125) 50%
      );

      @include themify($themes) {
        background: themed("background", "code");
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
      color: colors.$red-500;
      display: inline;
      white-space: normal;
      -webkit-box-sizing: border-box;
      -moz-box-sizing: border-box;
      box-sizing: border-box;

      @include themify($themes) {
        // raw color
        background: themed("code", "base");
      }
    }

    .token {
      @extend %base-transition;
    }

    .token {
      &.comment,
      &.block-comment,
      &.prolog,
      &.doctype,
      &.cdata {
        @include themify($themes) {
          color: themed("code", "comment");
        }
      }

      &.punctuation {
        @include themify($themes) {
          color: themed("code", "punctuation");
        }
      }

      &.operator {
        @include themify($themes) {
          color: themed("code", "operator");
        }
      }

      &.tag {
        @include themify($themes) {
          color: themed("code", "tag");
        }
      }

      &.number {
        @include themify($themes) {
          color: themed("code", "number");
        }
      }

      &.boolean {
        @include themify($themes) {
          color: themed("code", "boolean");
        }
      }

      &.string {
        @include themify($themes) {
          color: themed("code", "string");
        }
      }

      &.function-name,
      &.function {
        @include themify($themes) {
          color: themed("code", "function");
        }
      }

      &.property,
      &.constant,
      &.symbol,
      &.deleted {
        @include themify($themes) {
          color: themed("code", "property");
        }
      }

      &.selector,
      &.char,
      &.builtin,
      &.inserted {
        @include themify($themes) {
          color: themed("code", "selector");
        }
      }

      &.attr-name {
        @include themify($themes) {
          color: themed("code", "attr-name");
        }
      }

      &.attr-value {
        @include themify($themes) {
          color: themed("code", "attr-value");
        }
      }

      &.entity,
      &.url,
      &.variable {
        @include themify($themes) {
          color: themed("code", "operator");
        }
      }

      &.atrule,
      &.keyword,
      &.class-name {
        @include themify($themes) {
          color: themed("code", "keyword");
        }
      }

      &.regex,
      &.important {
        @include themify($themes) {
          color: themed("code", "regex");
        }
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
        @include themify($themes) {
          color: themed("code", "namespace");
        }
      }
    }

    .language-css,
    .style {
      &.token.string {
        @include themify($themes) {
          color: themed("code", "style-token");
        }
      }
    }
  }
}
</style>
