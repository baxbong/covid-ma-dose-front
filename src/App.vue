<template>
  <div id="app">
    <VaccinationCenter ville="Rennes"/>
  </div>
</template>

<script>
import VaccinationCenter from './components/VaccinationCenter.vue'

export default {
  name: 'App',
  components: {
    VaccinationCenter
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
