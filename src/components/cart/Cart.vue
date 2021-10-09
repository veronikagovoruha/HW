<template>
  <div class='cart'>

    <Notification
            :messages="messages"
    />

    <router-link class="cart-link" :to="{name: 'catalog'}">
      <div class="cart__link_to_cart">Вернутся</div>
    </router-link>
    <h1 class="cart-title">Корзина</h1>
    <p v-if="!cart_data.length">Корзина пуста</p>
    <CartItem
        v-for="(item, index) in cart_data"
        :key="item.title"
        :cart_item_data="item"
        @deleteFromCart="deleteFromCart(index)"
        @increment="increment(index)"
        @decrement="decrement(index)"
    />
    <div class="cart__total">
      <label class="cart__total-sum">Общая сумма: {{this.toFix(cartTotalCost)}}</label>
      <router-link :to="{name: 'catalog', params: {ordered: `Ваш заказ на сумму ${this.toFix(cartTotalCost)} успешно оформлен`}}">
        <button class="cart-btn" v-if="cart_data.length">Заказать</button>
      </router-link>
    </div>
  </div>
</template>

<script>
  import CartItem from './CartItem'
  import reduceString from "../../filters/reduceString";
  import formattedPrice from "../../filters/price-format";
  import {mapActions} from 'vuex'
  import Notification from '../notifications/Notification'

  export default {
    name: "Cart",
    components: {
      CartItem,
      Notification
    },
    props: {
      cart_data: {
        type: Array,
        default() {
          return []
        }
      }
    },
    methods: {
      ...mapActions([
        'DELETE_FROM_CART',
        'INCREMENT_CART_ITEM',
        'DECREMENT_CART_ITEM',
      ]),
      toFix(value) {
        value = parseFloat(value);
        return value.toFixed(2);
      },
      increment(index) {
        this.INCREMENT_CART_ITEM(index)
      },
      decrement(index) {
        this.DECREMENT_CART_ITEM(index)
      },
      deleteFromCart(index) {
        this.DELETE_FROM_CART(index)
      }
    },
    data() {
      return {
        messages: []
      }
    },
    filters: {
      formattedPrice,
      reduceString
    },
    computed: {
      cartTotalCost() {
        let result = []

        if (this.cart_data.length) {
          for (let item of this.cart_data) {
            result.push(item.price * item.quantity)
          }

          result = result.reduce(function (sum, el) {
            return sum + el;
          })
          return result;
        } else {
          return 0
        }
      }
    }
  }
</script>

<style lang="scss">
  .cart {
    margin-bottom: 100px;
    &__total {
      position: fixed;
      bottom: 0;
      right: 0;
      left: 0;
      padding: $padding*2 $padding*3;
      display: flex;
      justify-content: center;
      background: $green-bg;
      color: #ffffff;
      font-size: 20px;
    }

    .cart-link{
      text-decoration: none;
    }

    .cart__total{
      background: #fad7dc;
    }

    .cart-btn{
      width: 80px;
      height: 30px;
      border-radius: 5px;
      border: 1px solid gray;
      background: #424141;
      color:#fad7dc;
    }

    .cart__total-sum{
      color: gray;
      margin-right: 50px;
    }

    .cart-title{
      color: gray;
    }

    .cart__link_to_cart{
      display: flex;
      justify-content: flex-end;
      margin-right: 20px;
      color: #808080;
    }

    .total__name {
      margin-right: $margin*2;
    }
  }
</style>
