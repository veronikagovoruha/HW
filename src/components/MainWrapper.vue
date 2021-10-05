<template>
  <div class="main-wrapper">
    <Header />
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
  import Header from './layouts/Header'

  export default {
    name: 'MainWrapper',
    components: {
      Header
    },
    props: {},
    data() {
      return {
        title: 'Main wrapper'
      }
    },
    computed: {},
    methods: {},
    watch: {}
  }
</script>

<style>
  .main-wrapper {
    margin: 0 auto;
  }
</style>
