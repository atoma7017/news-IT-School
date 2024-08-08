//initializam state-ul

export const initialState = {
  products: [],
};

export function favoritesReducer(state, action) {
  switch (action.type) {
    case "ADD_TO_FAVORITES": {
      //cautam produsul aduagat in produsele pe care le avem in state sa vedem daca exista
      const isInList = state.products.find((product) => {
        return product.Id === action.payload.id;
      });
      //daca produsul este deja in state, returnam stat-ul
      if (isInList) {
        return state;
      } else {
        //daca produsul nu este in state, il adaufam la inceputul listei de produse
        const newState = {
          products: [action.payload, ...state.products],
        };
        return newState;
      }
    }
    case "REMOVE_FROM_FAVORITES": {
      //filtram produsele din state eliminandu-l pe cel care are id-ul venit din payload
      const filteredProducts = state.products.filter((product) => {
        return product.id !== action.payload;
      });
      const newState = {
        products: filteredProducts,
      };
      return newState;
    }
    //nu uitam sa returnam state-ul pe cazul defaul
    default: {
      return state;
    }
  }
}
