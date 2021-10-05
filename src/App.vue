<template>
  <div id="app">
    <vMainWrapper />
  </div>
</template>

<script>
  import vMainWrapper from './components/MainWrapper'

export default {
  name: 'app',
  components: {
    vMainWrapper
  },
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 160px;
}
</style>
