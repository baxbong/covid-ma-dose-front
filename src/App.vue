<template>
  <div id="app">
    <Rennes/>
  </div>
</template>

<script>
import Rennes from './components/Rennes.vue'

export default {
  name: 'App',
  components: {
    Rennes
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
