<template>
  <ResizeBounding
    :options="{
      prefix: 'ui-resizer__',
      width: 4,
      knob: {
        show: true,
        normalHidden: false,
      },
    }"
    :styles="{
      knob: [
        'knob',
        {
          height: '6px',
        },
      ],
    }"
  >
    <slot></slot>
  </ResizeBounding>
</template>

<script setup lang="ts">
import ResizeBounding from "vue3-resize-bounding";
</script>

<style lang="scss">
$prefix: "ui-resizer__";

.#{$prefix} {
  &pane {
    // normal state:

    .#{$prefix}splitter {
      @include themify($app-themes) {
        background: transparentize(themed("colors", "accent"), 1);
      }
    }

    .#{$prefix}knob {
      @include themify($app-themes) {
        background: themed("resizer", "knob");
        border: 1px solid themed("background", "secondary");
      }
    }

    // selected pane:
    &.focused {
      .#{$prefix}splitter {
        @include themify($app-themes) {
          background: transparentize(themed("colors", "accent"), 0);
        }
      }

      .#{$prefix}knob {
        @include themify($app-themes) {
          // background: transparentize(themed("colors", "accent"), 1);
        }
      }
    }
  }

  &splitter {
    @include transition(background, 125ms, ease-out);
  }
}
</style>
