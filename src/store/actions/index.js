import * as actionTypes from "./actionTypes";

export const addProduct = (product) => ({
  type: actionTypes.ADD_PRODUCT,
  product,
});

export const getProducts = (limit, pageNumber, searchKeyword) => ({
  type: actionTypes.GET_PRODUCTS,
  limit,
  pageNumber,
  searchKeyword,
});

export const resetStore = () => ({
  type: actionTypes.RESET_STORE,
});
