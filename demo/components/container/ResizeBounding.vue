<script setup lang="ts">
import Resizer, { globalClassNames } from "vue3-resize-bounding";

import tokens from "@/tokens";

const knobWidth = tokens.resizer["knobWidth"];
const knobHeight = tokens.resizer["knobHeight"];
const knobRoundness = tokens.resizer["knobRoundness"];
const activeAreaWidth = tokens.resizer["activeAreaWidth"];

const PREFIX = "ui-resizer__";
</script>

<template>
  <Resizer
    data-testid="resizer"
    :options="{
      prefix: PREFIX,
      width: 4,
      activeAreaWidth,
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
          width: knobWidth,
          height: knobHeight,
          borderRadius: knobRoundness,
          transition: 'background 75ms ease-out',
        },
      ],
    }"
  >
    <slot></slot>
  </Resizer>
</template>

<style lang="scss">
$prefix: "ui-resizer__";

.#{$prefix} {
  &pane {
    // normal state:
    .#{$prefix}splitter {
      @include themify($themes) {
        background: rgba(themed("label", "accent"), 0);
      }
    }

    .#{$prefix}knob {
      @include themify($themes) {
        background: themed("resizer", "knobNormal");
      }
    }

    // selected pane:
    &.active {
      .#{$prefix}splitter {
        @include themify($themes) {
          background: rgba(themed("label", "accent"), 1);
        }
      }
    }
  }

  &splitter {
    @include transition(background, 125ms, ease-out);
  }
}
</style>
