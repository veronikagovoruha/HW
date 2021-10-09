<template>
  <div class='header'>
    <div class="search-field">
      <h1 class="header-title">Book Shop</h1>
      <input
              class="header-input"
          v-on:keyup.enter="search(searchValue)"
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
    background: #fad7dc;
    padding: 16px;
    position: fixed;
    width: 100%;
    top: 0;
    left: 0;

    .header-input{
      height: 25px;
      border-radius: 5px;
      border: 1px solid gray;
    }

    .header-title{
      margin-right: 810px;
      color: gray;
    }
    img {
      width: 50px;
    }

    .header__link_to_cart{
      padding-left: 20px;
      color: gray;
    }

    .header__link_to_cart-image{
      height: 25px;
      width: 25px;
      color: gray;
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
      background: transparent;
      border: none;
      color: gray;
    }
  }
</style>
