<template>
  <div class="popup_wrapper" ref="popup_wrapper">
    <div class='popup'>
      <div class="popup__header">
        <span>{{popupTitle}}</span>
        <span>
        <i
            class="material-icons"
            @click="closePopup"
        >
          close
        </i>
      </span>
      </div>
      <div class="popup__content">
        <slot></slot>
      </div>
      <div class="popup__footer">
        <button class="close_modal" @click="closePopup">Закрыть</button>
        <button
            class="submit_btn"
            @click="rightBtnAction(nameValue, emailValue, phoneValue)"
        >
          {{rightBtnTitle}}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapActions} from "vuex";

  export default {
    name: "popup",
    props: {
      nameValue: {
        type: String,
        default: ''
      },
      emailValue: {
        type: String,
        default: ''
      },
      phoneValue: {
        type: String,
        default: ''
      },
      popupTitle: {
        type: String,
        default: 'Popup name'
      },
      rightBtnTitle: {
        type: String,
        default: 'Ok'
      }
    },
    data() {
      return {}
    },
    methods: {
      ...mapActions([
        'ADD_TO_CART'
      ]),
      rightBtnAction(nameValue, emailValue, phoneValue) {
        this.$emit('rightBtnAction', nameValue, emailValue, phoneValue)
      },
      closePopup() {
        this.$emit('closePopup')
      }
    },
    mounted() {
      let vm = this;
      document.addEventListener('click', function (item) {
        if (item.target === vm.$refs['popup_wrapper']) {
          vm.closePopup()
        }
      })
    },
  }
</script>

<style lang="scss">
  .popup_wrapper {
    background: rgba(64,64,64, .4);
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    right: 0;
    left: 0;
    top: 0;
    bottom: 0;
  }
  .popup {
    padding: 16px;
    position: fixed;
    top: 50px;
    width: 400px;
    background: #ffffff;
    box-shadow: 0 0 17px 0 #e7e7e7;
    z-index: 10;
    &__header, &__footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    &__content {
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .submit_btn {
      padding: 8px;
      color: #ffffff;
      background: #26ae68;
    }
    .close_modal {
      padding: 8px;
      color: #ffffff;
      background: red;
    }
  }
</style>
