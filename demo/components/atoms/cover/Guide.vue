<template>
  <div class="ui-main-guide">
    <div class="ui-theme-switch">
      <AtomsSwitchBase
        :state="colorMode.value === 'light'"
        @update:state="onChangeTheme"
      />
    </div>
    <h3 class="ui-main-guide__title">{{ title }}</h3>
    <AtomsLinkBoxed
      v-for="({ url, name }, idx) in links"
      :key="idx"
      :src="url"
      @copy="onCopy(name)"
    >
      {{ name }}
    </AtomsLinkBoxed>
    <AtomsLinkBoxed @copy="onCopy(figmaUrl)">
      <AtomsLinkBasic
        :size="'lg'"
        :icon-name="'figma-logo'"
        :to="figmaUrl"
        :name="'ResizeBounding'"
        filled
      />
    </AtomsLinkBoxed>
  </div>
</template>

<script setup lang="ts">
interface Props {
  title?: string;
  links: Array<LinkData>;
}

withDefaults(defineProps<Props>(), {
  title: "Install",
});

const onCopy = (name: string | undefined): void => {
  if (name) navigator.clipboard.writeText(name);
};

const figmaUrl =
  "https://www.figma.com/community/file/1392603830584852243/resize-bounding";

const colorMode = useColorMode();

const onChangeTheme = () => {
  colorMode.value = colorMode.value === "light" ? "dark" : "light";
};
</script>

<script lang="ts">
export interface LinkData {
  name: string;
  url?: string;
}
</script>

<style lang="scss">
.ui {
  &-main-guide {
    display: flex;
    @include flex-col(center);
    @include box(100%);

    .ui-main-guide__title {
      padding-top: 20px;
      @extend %title--xs;
      margin: 0;
      text-align: center;

      @include themify($app-themes) {
        color: themed("text", "primary");
      }
    }

    .ui-boxed-link {
      @extend %code-font;
      @include use-font-size(--sm);
    }
  }

  &-theme-switch {
    position: absolute;
    top: 20px;
    right: 20px;
  }
}
</style>
