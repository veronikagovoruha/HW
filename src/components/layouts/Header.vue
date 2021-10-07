<template>
  <div class='header'>
    <div class="search-field">
      <input
          type="text"
          v-model="searchValue"
      >
      <button class="search_btn">
        <i class="material-icons" @click="search(searchValue)">search</i>
      </button>

      <router-link :to="{name: 'cart', params: {cart_data: CART}}">
        <div class="header__link_to_cart">
          <img class="header__link_to_cart-image" :src="require('../../assets/images/shopping-cart.svg')" alt="">{{CART.length}}
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
  import {mapActions, mapGetters} from 'vuex'

  export default {
    name: "Header",
    props: {},
    data() {
      return {
        searchValue: ''
      }
    },
    computed: {
      ...mapGetters([
        'CART',
        'SEARCH_VALUE',
      ])
    },
    methods: {
      ...mapActions([
        'GET_SEARCH_VALUE_TO_VUEX',
        'GET_BOOKS_FROM_API',
        'ADD_TO_CART'
      ]),
      search(searchValue) {
        this.GET_BOOKS_FROM_API(searchValue);
        if (this.$route.path !== '/catalog') {
          this.$router.push('/catalog')
        }
      },
    }
  }
</script>

<style lang="scss">
  .header {
    display: flex;
    justify-content: center;
    align-items: center;
    background: $green-bg;
    padding: 16px;
    position: fixed;
    width: 100%;
    top: 0;
    left: 0;

    img {
      width: 50px;
    }

    .header__link_to_cart{
      padding-left: 40px;
    }

    .header__link_to_cart-image{
      height: 30px;
      width: 30px;
      padding-right: 5px;
    }

    .search-field {
      padding: 16px;
      right: 200px;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .search_btn {
      margin-left: 16px;
      background: transparent;
      border: none;
    }
  }
</style>
