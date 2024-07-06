<template>
  <main id="app" :class="[{ 'theme-dark': true }]">
    <div id="app--container">
      <NuxtPage />
    </div>
  </main>
</template>

<script lang="ts"></script>

<style lang="scss">
#app,
body,
#__nuxt {
  @include box(100vw, 100vh);
  margin: 0;
  padding: 0;
  font-family: "Roboto";
  overflow: hidden;

  * {
    box-sizing: border-box;
  }
}

#app--container {
  @include box(100%);

  * {
    ::-webkit-scrollbar {
      width: 3px;

      &-track {
        border-radius: 1px;
      }

      &-thumb {
        border-radius: 1px;
        @include themify($app-themes) {
          background: themed("scrollbar", "thumb");
        }
      }
    }
  }
}
</style>
