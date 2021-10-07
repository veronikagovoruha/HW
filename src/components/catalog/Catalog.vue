<template>
  <div class='catalog'>

    <Notification
        :messages="messages"
    />


    <router-link :to="{name: 'cart', params: {cart_data: CART}}">
      <div class="catalog__link_to_cart">
        <img class="catalog__link_to_cart-image" :src="require('../../assets/images/shopping-cart.svg')" alt="">{{CART.length}}
      </div>
    </router-link>
    <h1>Каталог</h1>
    <div class="catalog__list">
      <BookItem
          v-for="book in booksList"
          :key="book.title"
          :bookData="book"
          :orderValidation="orderValidation"
          @addToCart="addToCart"
      />
    </div>
  </div>
</template>

<script>
  import BookItem from './BookItem'
  import {mapActions, mapGetters} from 'vuex'
  import Notification from '../notifications/Notification'

  export default {
    name: "Catalog",
    components: {
      BookItem,
      Notification
    },
    props: {},
    data() {
      return {
        messages: [],
        orderValidation: {
          isNameValid: true,
          isPhoneValid: true,
          isEmailValid: true
        }
      }
    },
    computed: {
      ...mapGetters([
        'BOOKS',
        'CART',
        'SEARCH_VALUE',
        'FORM',
      ]),
      booksList() {
        return this.BOOKS
                .filter(item => item["saleInfo"]["saleability"] === "FOR_SALE")
                .map(item => ({
                  "title":item["volumeInfo"]["title"],
                  "authors":this.buildAuthors(item["volumeInfo"]["authors"]),
                  "publishedDate":this.formatPublishedDate(item["volumeInfo"]["publishedDate"]),
                  "description":item["volumeInfo"]["description"],
                  "imageLinks":item["volumeInfo"]["imageLinks"],
                  "price":item["saleInfo"]["listPrice"]["amount"],
                  "currencyCode":item["saleInfo"]["listPrice"]["currencyCode"]
                }))
      },
    },
    methods: {
      ...mapActions([
        'ADD_TO_CART'
      ]),
      buildAuthors(authors){
        return authors ? authors.join(", ") : "";
      },
      formatPublishedDate(publishedDate){
        return publishedDate ? publishedDate : "";
      },
      validateEmail(email) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
      },
      addToCart(data) {
        this.orderValidation.isNameValid = this.FORM.nameValue.length >= 2;
        this.orderValidation.isEmailValid = this.validateEmail(this.FORM.emailValue);
        this.orderValidation.isPhoneValid = this.FORM.phoneValue.length >= 2;
        if(this.orderValidation.isNameValid && this.orderValidation.isEmailValid && this.orderValidation.isPhoneValid) {
          this.ADD_TO_CART(data)
                  .then(() => {
                    let timeStamp = Date.now().toLocaleString();
                    this.messages.unshift(
                            {name: 'Товар добавлен в корзину', icon: 'check_circle', id: timeStamp}
                    )
                  })
        }
      },
    },
    watch: {
    },
  }
</script>

<style lang="scss">
  .catalog {
    &__list {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      align-items: center;
    }

    &__link_to_cart {
      position: fixed;
      top: 80px;
      right: 10px;
      padding: $padding*2;
    }
  }

  .filters {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .range-slider {
    width: 200px;
    margin: auto 16px;
    text-align: center;
    position: relative;
  }

  .range-slider svg, .range-slider input[type=range] {
    position: absolute;
    left: 0;
    bottom: 0;
  }

  input[type=range]::-webkit-slider-thumb {
    z-index: 2;
    position: relative;
    top: 2px;
    margin-top: -7px;
  }

  .catalog__link_to_cart-image{
    width: 35px;
    height: 35px;
  }
</style>
