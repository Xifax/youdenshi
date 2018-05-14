<template>
  <div id="app">
    <div class="titlebar">
      <div class="title aligned">
        Youdenshi
      </div>
      <div class="controls aligned">
        <div
          @click="close()"
          class="button is-small is-primary is-outlined is-inverted">close</div>
      </div>
    </div>
      <router-view></router-view>
  </div>
</template>

<script>
  import { app } from 'electron'
  export default {
    name: 'youdenshi',
    methods: {
      close () {
        app.quit()
      }
    }
  }
</script>

<style lang="scss">
  /* CSS */

  /* Simulate window titlebar */
  .titlebar {
    width: 100%;
    height: 40px;
    background: palegreen;
    -webkit-user-select: none;
    -webkit-app-region: drag;
    cursor: pointer;
    .aligned {
      position: relative;
      top: 50%;
      transform: translateY(-50%);
    }
    .title {
      margin-left: 0.5em;
      color: white;
      font-size: 1.5em;
      float: left;
    }
    .controls {
      -webkit-app-region: no-drag;
      -webkit-user-select: all !important;
      margin-right: 0.5em;
      float: right;
    }
  }

  /* Hide scrollbar */
  ::-webkit-scrollbar {
    display: none;
  }
</style>
