// src/ducks/product.js
// a duck combines reducers, action types, action creators, and selectors

import { filter, find, sortBy } from 'your-favorite-library'
export const types = {
  ...
}

export const initialState = {
  products: [],
  isLoading: false,
  error: null
}

// reducer
export default (state = initialState, action) => {
...
}

export const actions = {
  ...
}

export const getProduct = (state) => state.product.products
export const getProductById = (state, id) => find(state.product.products, id)
export const getProductSortedByName = (state) => sortBy(state.product.products, 'name')
export const getExpiredProducts = (state) => filter(state.product.products, { isExpired: true })