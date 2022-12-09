export const SET_TOTAL = "SET_TOTAL";
export const SET_ADMIN = "SET_ADMIN";
export const ADD_BASKET = "ADD_BASKET";
export const DELETE_BASKET = "DELETE_BASKET";
export const CHANGE_AMOUNT = "CHANGE_AMOUNT";
export const RESET_BASKET = "RESET_BASKET";
export const SET_PRODUCT = "SET_PRODUCT";
export const ADD_PHOTO = "ADD_PHOTO";

export const setTotal = (data) => ({
  type: SET_TOTAL,
  payload: data,
});

export const setAdmin = () => ({
  type: SET_ADMIN,
});

export const addBasket = (data) => ({
  type: ADD_BASKET,
  payload: data,
});
export const deleteBasket = (data) => ({
  type: DELETE_BASKET,
  payload: data,
});
export const changeAmount = (data) => ({
  type: CHANGE_AMOUNT,
  payload: data,
});

export const resetBasket = () => ({
  type: RESET_BASKET,
});

export const setProduct = (data) => ({
  type: SET_PRODUCT,
  payload: data,
});

export const addPhoto = (data)=>({
  type:ADD_PHOTO,
  payload:data
})
