<template>
  <div id="app">
    <Header />
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
  import Header from './components/layouts/Header'

export default {
  name: 'app',
  components: {
    Header
  },
  props: {},
  data() {
    return {
      title: 'App'
    }
  },
  computed: {},
  methods: {},
  watch: {}
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
