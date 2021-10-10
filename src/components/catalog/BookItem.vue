<template >
  <div class='book-item'>

    <popup
        v-if="isInfoPopupVisible"
        rightBtnTitle="Добавить в корзину"
        :popupTitle="bookData.title"
        @closePopup="closeInfoPopup"
        @rightBtnAction="addToCart"
        :nameValue="nameValue"
        :phoneValue="phoneValue"
        :emailValue="emailValue"
    >
      <img class="book-item__image" :src="bookData.imageLinks.smallThumbnail" alt="img">
      <form>
        <p class="book-item__name">{{bookData.description | reduceString}}</p>
        <input type="book-item__text" class="book-item__nameV" placeholder="Имя" v-model="nameValue"><br>
        <label class="book-item__nameError" v-if="!orderValidation.isNameValid">Введите корректное имя</label><br>
        <input type="book-item__tel" class="book-item__tel" placeholder="+380978664455" v-model="phoneValue"><br>
        <label class="book-item__telError" v-if="!orderValidation.isPhoneValid">Введите корректный телефон</label><br>
        <input type="book-item__email" class="book-item__email" placeholder="vvvttt@gmail.com" v-model="emailValue"><br>
        <label class="book-item__emailError" v-if="!orderValidation.isEmailValid">Введите корректную почту</label>
      </form>
    </popup>

    <img class="book-item__image" :src="bookData.imageLinks.smallThumbnail" alt="img">
    <p class="book-item__name">{{bookData.title}}</p>
    <p class="book-item__price">Авторы: {{bookData.authors}}</p>
    <p class="book-item__price" >Год выпуска: {{bookData.publishedDate}}</p>
    <br>
    <button
        class="book-item__add_to_cart_btn "
        v-bind:class="[bookData.forSale ? 'book-item__active' : 'book-item__disabled']"
        @click="showPopupInfo"
        :disabled="!bookData.forSale"
    >Заказать
    </button>
  </div>
</template>

<script>
    import Popup from '../popup/Popup'
    import reduceString from '../../filters/reduceString'
    import formattedPrice from "../../filters/price-format";

    export default {
    name: "BookItem",
    components: {
      Popup
    },
    props: {
      bookData: {
        type: Object,
        default() {
          return {}
        }
      },
    },
    data() {
      return {
        nameValue: '',
        phoneValue: '',
        emailValue: '',
        isInfoPopupVisible: false,
        orderValidation: {
          isNameValid: true,
          isPhoneValid: true,
          isEmailValid: true
        },
      }
    },
    filters: {
      reduceString,
      formattedPrice
    },
    methods: {
      showPopupInfo() {
        this.isInfoPopupVisible = true;
      },
      closeInfoPopup() {
        this.nameValue = "";
        this.phoneValue ="";
        this.emailValue ="";
        this.isInfoPopupVisible = false;
      },
      validateEmail(email) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
      },
      validatePhone(phone) {
        const re = /^\+380[0-9]{9}$/;
        return re.test(String(phone));
      },
      addToCart() {
        this.orderValidation.isNameValid = this.nameValue.length >= 2;
        this.orderValidation.isEmailValid = this.validateEmail(this.emailValue);
        this.orderValidation.isPhoneValid = this.validatePhone(this.phoneValue);
        if(this.orderValidation.isNameValid && this.orderValidation.isEmailValid && this.orderValidation.isPhoneValid) {
          this.closeInfoPopup();
          this.$emit('addToCart', this.bookData);
        }
      }
    },
    mounted() {
      this.$set(this.bookData, 'quantity', 1)
    }
  }
</script>

<style lang="scss">
  .book-item {
    flex-basis: 25%;
    box-shadow: 0 0 8px 0 #e0e0e0;
    padding: $padding*2;
    margin-bottom: $margin*2;

    &__image {
      width: 100px;
    }
    }

  .book-item__add_to_cart_btn{
    width: 80px;
    height: 30px;
    border-radius: 5px;
    border: 1px solid gray;
    background: #fad7dc;
    color: #424141;
  }
  .book-item__active {
    background: #fad7dc;
  }
  .book-item__disabled{
    background: #ffffff;
  }
  .book-item__nameV{
    border-radius: 5px;
    border: 1px solid grey;
    height: 20px;
    margin-bottom: 5px;
  }
  .book-item__tel{
    border-radius: 5px;
    border: 1px solid grey;
    height: 20px;
    margin-bottom: 5px;
  }
  .book-item__email{
    border-radius: 5px;
    border: 1px solid grey;
    height: 20px;
    margin-bottom: 5px;
  }


    .book-item__nameError{
      font-size: 11px;
      color: red;
    }
    .book-item__telError{
      font-size: 11px;
      color: red;
    }
    .book-item__emailError{
      font-size: 11px;
      color: red;
    }

</style>
