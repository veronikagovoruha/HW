
export default {
  GET_SEARCH_VALUE_TO_VUEX ({commit}, value) {
    commit('SET_SEARCH_VALUE_TO_VUEX', value)
  },
  SETUP_FORM({commit}, formValues) {
    commit('SET_FORM_VALUE', formValues);
  },
  CLEANUP_FORM({commit}) {
    commit('CLEANUP_FORM');
  },
  ADD_TO_CART({commit}, product) {
    commit('SET_CART', product);
  },
  INCREMENT_CART_ITEM({commit}, index) {
    commit('INCREMENT', index)
  },
  DECREMENT_CART_ITEM({commit}, index) {
    commit('DECREMENT', index)
  },
  DELETE_FROM_CART({commit}, index) {
    commit('REMOVE_FROM_CART', index)
  },
  CLEANUP_CART({commit}) {
    commit('CLEANUP_CART')
  }
}