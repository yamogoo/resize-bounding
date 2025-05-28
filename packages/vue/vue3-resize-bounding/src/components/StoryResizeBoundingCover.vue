<script lang="ts" setup>
import StoryCoverMainLogo from "./StoryCoverMainLogo.vue";
import StoryVersionBadge from "./StoryVersionBadge.vue";

const VERSION = import.meta.env.APP_VERSION;
</script>

<template>
  <div class="resize-bounding-cover">
    <div class="resize-bounding-cover__container">
      <div class="resize-bounding-cover__logo">
        <StoryCoverMainLogo></StoryCoverMainLogo>
        <p class="resize-bounding-cover__text">
          VUE3
        </p>
      </div>
      <StoryVersionBadge
        class="resize-bounding-cover__version-badge"
        label="version"
        :value="VERSION"
      ></StoryVersionBadge>
    </div>
  </div>
</template>

<style lang="scss">
@use "../assets/scss/utils.scss" as *;
@use "../assets/scss/colors.scss" as *;
@use "../assets/scss/typography.scss" as *;

.resize-bounding-cover {
  container-type: size;
  container-name: cover-container;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  padding: 1rem;
  overflow: hidden;

  &__container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: px2rem(32px);
    width: 100%;
    height: 100%;
    border: 1px solid $border;
    border-radius: 0.5rem;
  }

  @container cover-container (min-height: 360px) {
    .resize-bounding-cover__container {
      gap: px2rem(24px);
    }

    .resize-bounding-cover__logo {
      padding-bottom: 40px;
    }

    .resize-bounding-cover__version-badge {
      position: absolute;
      bottom: 3rem;
    }
  }

  @container cover-container (max-height: 359px) {
    .resize-bounding-cover__container {
      gap: px2rem(8px);
    }

    .resize-bounding-cover__logo {
      gap: px2rem(4px) !important;
    }

    .main-logo {
      gap: px2rem(4px) !important;
    }
  }

  &__text {
    display: block;
    font-family: $font-family;
    font-size: px2em(11px);
    font-weight: 500;
    letter-spacing: 6%;
    color: $label;
    text-align: center;
  }
}
</style>
