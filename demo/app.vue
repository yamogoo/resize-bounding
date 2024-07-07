<template>
  <main id="app">
    <NuxtPage />
  </main>
</template>

<style lang="scss">
#app,
body,
#__nuxt {
  @include box(100vw, 100vh);
  margin: 0;
  padding: 0;
  font-family: "Roboto", sans-serif;
  overflow: hidden;

  * {
    box-sizing: border-box;
  }

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
