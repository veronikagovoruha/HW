<template>
  <div class='catalog'>

    <Notification
        :messages="messages"
    />

    <h1 class="catalog-title">Каталог</h1>
    <div class="catalog__list">
      <BookItem
          v-for="book in booksList"
          :key="book.title"
          :bookData="book"
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
    props: {
      ordered:{
        type: String,
      }
    },
    data() {
      return {
        messages: [],
      }
    },
    computed: {
      ...mapGetters([
        'BOOKS',
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
        'ADD_TO_CART',
        'CLEANUP_CART',
      ]),
      buildAuthors(authors){
        return authors ? authors.join(", ") : "";
      },
      formatPublishedDate(publishedDate){
        return publishedDate ? publishedDate : "";
      },
      addToCart(data) {
        this.ADD_TO_CART(data)
                .then(() => {
                  let timeStamp = Date.now().toLocaleString();
                  this.messages.unshift(
                          {name: 'Товар добавлен в корзину', icon: 'check_circle', id: timeStamp}
                  )
                })
      },
    },
    activated() {
      console.log(this.ordered);
      if (this.ordered){
        this.CLEANUP_CART();
        let timeStamp = Date.now().toLocaleString();
        this.messages.unshift(
                {name: this.ordered, icon: 'check_circle', id: timeStamp});
      }
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

  .catalog-title{
    color: gray;
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


</style>
