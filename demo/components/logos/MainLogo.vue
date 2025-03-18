<script setup lang="ts">
interface Props {
  descriptor: string;
}

defineProps<Props>();
</script>

<template>
  <div class="main-logo">
    <div class="main-logo__image">
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M3.10624 4.10517C2.85712 4.59411 2.85712 5.23417 2.85712 6.51429L2.85712 17.4857C2.85712 18.7658 2.85712 19.4059 3.10624 19.8948C3.32538 20.3249 3.67505 20.6746 4.10514 20.8937C4.59408 21.1429 5.23414 21.1429 6.51426 21.1429H17.4857C18.7658 21.1429 19.4059 21.1429 19.8948 20.8937C20.3249 20.6746 20.6746 20.3249 20.8937 19.8948C21.1428 19.4059 21.1428 18.7658 21.1428 17.4857V6.51429C21.1428 5.23417 21.1428 4.59411 20.8937 4.10517C20.6746 3.67509 20.3249 3.32542 19.8948 3.10628C19.4059 2.85715 18.7658 2.85715 17.4857 2.85715L6.51426 2.85715C5.23414 2.85715 4.59408 2.85715 4.10514 3.10628C3.67505 3.32542 3.32538 3.67509 3.10624 4.10517ZM12.5714 0L12.5714 24H11.4285L11.4285 0L12.5714 0ZM9.71426 11.4286H6.81654L8.26541 9.97972L7.45728 9.1716L5.43697 11.1919C4.99065 11.6382 4.99065 12.3618 5.43697 12.8081L7.45728 14.8284L8.26541 14.0203L6.81651 12.5714H9.71426L9.71426 11.4286ZM14.2857 12.5714H17.1835L15.7346 14.0203L16.5427 14.8284L18.5631 12.8081C19.0094 12.3618 19.0094 11.6382 18.5631 11.1919L16.5427 9.1716L15.7346 9.97972L17.1835 11.4286H14.2857L14.2857 12.5714Z"
          fill="black"
        />
      </svg>
    </div>
    <span class="main-logo__descriptor">{{ descriptor }}</span>
  </div>
</template>

<style lang="scss">
@use "sass:map";

.main-logo {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  @include respond-above(md) {
    gap: map.get(map.get($logo, "desktop"), "gap");
  }
  @include respond-below(md) {
    gap: map.get(map.get($logo, "mobile"), "gap");
  }

  &__image {
    @include respond-above(md) {
      @include box(map.get(map.get($logo, "desktop"), "size"));
    }
    @include respond-below(md) {
      @include box(map.get(map.get($logo, "mobile"), "size"));
    }

    svg {
      @include box(100%);

      * {
        @include themify($themes) {
          fill: themed("logo", "image");
        }
        @extend %base-transition;
      }
    }
  }

  &__descriptor {
    @extend %t__display__1;

    @include themify($themes) {
      color: themed("logo", "descriptor");
    }
    @extend %base-transition;
  }
}
</style>
