export default {
  GET_BOOKS_FROM_API({commit}, bookName) {
    return fetch(         `https://www.googleapis.com/books/v1/volumes?q=${bookName}`, {method: 'GET'})
        .then(response => response.json())
        .then(json => {
            commit('SET_BOOKS_TO_STATE', json["items"]);
            console.log(json["items"].length);
            return json["items"];
        })
        .catch(error => {
          console.log(error)
          return error;
        });
  }
}