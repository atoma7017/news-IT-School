//actiunea pentru adaugarea la favorite
export function addToFavorites(product) {
  return {
    type: "ADD_TO_FAVORITES",
    payload: product,
  };
}

//actiunea pentru stergerea de la favorite

export function removeFromFavorites(productId) {
  return {
    type: "REMOVE_FROM_FAVORITES",
    payload: productId,
  };
}
