<template >
  <div class='catalog-item'>

    <v-popup
        v-if="isInfoPopupVisible"
        rightBtnTitle="Добавить в корзину"
        :popupTitle="bookData.title"
        @closePopup="closeInfoPopup"
        @rightBtnAction="addToCart"
        :nameValue="nameValue"
        :phoneValue="phoneValue"
        :emailValue="emailValue"
    >
      <img class="catalog-item__image" :src="bookData.imageLinks.smallThumbnail" alt="img">
      <form>
        <p class="catalog-item__name">{{bookData.description | reduceString}}</p>
        <input type="text" class="name" placeholder="Имя" v-model="nameValue">
        <label class="nameError" v-if="!orderValidation.isNameValid">Введите корректное имя</label>
        <input type="tel" class="tel" placeholder="+380978664455" v-model="phoneValue">
        <label class="telError" v-if="!orderValidation.isNameValid">Введите корректный телефон</label>
        <input type="email" class="email" placeholder="vvvttt@gmail.com" v-model="emailValue">
        <label class="emailError" v-if="!orderValidation.isNameValid">Введите корректную почту</label>
      </form>
    </v-popup>

    <img class="catalog-item__image" :src="bookData.imageLinks.smallThumbnail" alt="img">
    <p class="catalog-item__name">{{bookData.title}}</p>
    <p class="catalog-item__price">Авторы: {{bookData.authors}}</p>
    <p class="catalog-item__price">Год выпуска: {{bookData.publishedDate}}</p>
    <br>
    <button
        class="catalog-item__add_to_cart_btn btn"
        @click="showPopupInfo"
    >Заказать
    </button>
  </div>
</template>

<script>
  import vPopup from '../popup/v-popup'
  import reduceString from '../../filters/reduceString'
  import formattedPrice from "../../filters/price-format";
  import {mapActions} from "vuex";

  export default {
    name: "BookItem",
    components: {
      vPopup
    },
    props: {
      bookData: {
        type: Object,
        default() {
          return {}
        }
      },
      orderValidation: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    data() {
      return {
        nameValue: '',
        phoneValue: '',
        emailValue: '',
        isInfoPopupVisible: false,
      }
    },
    filters: {
      reduceString,
      formattedPrice
    },
    computed: {
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
        'SETUP_FORM',
        'CLEANUP_FORM',
      ]),
      showPopupInfo() {
        this.isInfoPopupVisible = true;
      },
      closeInfoPopup() {
        this.CLEANUP_FORM();
        this.isInfoPopupVisible = false;
      },
      addToCart(nameValue, emailValue, phoneValue) {
        this.SETUP_FORM({
          "nameValue": nameValue,
          "emailValue": emailValue,
          "phoneValue": phoneValue,
        });
        this.$emit('addToCart', this.bookData);
      }
    },
    mounted() {
      this.$set(this.bookData, 'quantity', 1)
    }
  }
</script>

<style lang="scss">
  .catalog-item {
    flex-basis: 25%;
    box-shadow: 0 0 8px 0 #e0e0e0;
    padding: $padding*2;
    margin-bottom: $margin*2;

    &__image {
      width: 100px;
    }
    }
  .name{
    margin-bottom: 10px;
  }
  .tel{
    margin-bottom: 10px;
  }
  .email{
    margin-bottom: 10px;
  }
    .nameError{
      font-size: 11px;
      color: red;
    }
    .telError{
      font-size: 11px;
      color: red;
    }
    .emailError{
      font-size: 11px;
      color: red;
    }

</style>
