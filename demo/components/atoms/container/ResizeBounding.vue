<template>
  <Resizer
    :options="{
      prefix: PREFIX,
      width: 4,
      activeAreaWidth: undefined,
      position: 'central',
      knob: {
        show: true,
      },
      touchActions: true,
    }"
    :styles="{
      knob: [
        globalClassNames(PREFIX).knob,
        {
          width: '64px',
          height: '6px',
          borderRadius: '4px',
          transition: 'background 75ms ease-out',
          ['.pane :hover &']: {
            background: 'cornflowerblue',
          },
        },
      ],
    }"
  >
    <slot></slot>
  </Resizer>
</template>

<script setup lang="ts">
import Resizer, { globalClassNames } from "vue3-resize-bounding";

const PREFIX = "ui-resizer__";
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
    }
  }

  &splitter {
    @include transition(background, 125ms, ease-out);
  }
}
</style>
