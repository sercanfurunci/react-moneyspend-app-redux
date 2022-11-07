export const SET_TOTAL = "SET_TOTAL";
export const SET_MONEY = "SET_MONEY";
export const SET_ADMIN = "SET_ADMIN";
export const ADD_BASKET = "ADD_BASKET";
export const DELETE_BASKET = "DELETE_BASKET";
export const CHANGE_AMOUNT = "CHANGE_AMOUNT";
export const RESET_BASKET = "RESET_BASKET";

export const setMoney = (data) => ({
  type: SET_MONEY,
  payload: data,
});
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
