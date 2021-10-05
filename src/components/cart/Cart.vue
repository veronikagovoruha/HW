<template>
  <div class='cart'>

    <Notification
            :messages="messages"
    />

    <router-link :to="{name: 'catalog'}">
      <div class="catalog__link_to_cart">Вернутся</div>
    </router-link>
    <h1>Корзина</h1>
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
      <button v-if="cart_data.length" @click="order()">Заказать</button>
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
        'CLEANUP_CART',
      ]),
      order() {
        let timeStamp = Date.now().toLocaleString();
        this.CLEANUP_CART();
        this.messages.unshift(
                {name: `Ваш заказ на сумму ${this.cartTotalCost} успешно оформлен`, icon: 'check_circle', id: timeStamp}
        )
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

    .total__name {
      margin-right: $margin*2;
    }
  }
</style>
