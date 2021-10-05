<template>
  <div class='cart-item'>
    <img class="cart-item__image" :src="cart_item_data.imageLinks.smallThumbnail" alt="">
    <div class="cart-item__info">
      <p>{{cart_item_data.description}}</p>
      <p>{{cart_item_data.price}} {{cart_item_data.currencyCode}}</p>
    </div>
    <div class="cart-item__quantity">
      <div class="cart-item__quantity-text"><p>К-во:</p></div>
      <div class="cart-item__quantity-tools">
        <span class="quantity__tools">
        <span class="quantity__btn" @click="decrementItem">-</span>
        {{cart_item_data.quantity}}
        <span class="quantity__btn" @click="incrementItem">+</span>
      </span>
      </div>

    </div>
    <button @click="deleteFromCart">Удалить</button>
  </div>
</template>

<script>
import reduceString from '../../filters/reduceString'
import formattedPrice from "../../filters/price-format";


  export default {
    name: "CartItem",
    props: {
      cart_item_data: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    data() {
      return {}
    },
    filters: {
      reduceString,
      formattedPrice
    },
    computed: {},
    methods: {
      decrementItem() {
        this.$emit('decrement')
      },
      incrementItem() {
        this.$emit('increment')
      },
      deleteFromCart() {
        this.$emit('deleteFromCart')
      }
    }
  }
</script>

<style lang="scss">
  .cart-item {
    display: flex;
    flex-wrap: nowrap;
    max-width: 900px;
    margin: 0 auto;
    justify-content: space-between;
    align-items: center;
    box-shadow: 0 0 8px 0 #e0e0e0;
    padding: $padding*2;
    margin-bottom: $margin*2;
    &__image {
      max-width: 50px;
    }
    .cart-item__info{
      width: 675px;
    }
    .cart-item__quantity{
      display: flex;
      align-items: center;
    }
    .quantity__btn {
      cursor: pointer;
    }

    .quantity__tools {
      user-select: none;
    }
  }
</style>
