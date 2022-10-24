import { createSlice } from "@reduxjs/toolkit";
import alertify from "alertifyjs";

const initialState = {
  basket: [],
};

const basket = createSlice({
  name: "basket",
  initialState,
  reducers: {
    setBasket: (state, action) => {
      state.basket = action.payload;
    },
    addBasket: (state, action) => {
      const checkBasket = state.basket.find(
        (item) => item.id === action.payload
      );
      // ürün daha önce eklenmiş
      if (checkBasket) {
        checkBasket.amount += 1;
        state.basket = [
          ...state.basket.filter((item) => item.id !== action.payload),
          checkBasket,
        ];
      } else {
        state.basket = [
          ...state.basket,
          {
            id: action.payload,
            amount: 1,
          },
        ];
      }
      alertify.success("Sepete eklendi");
    },
    deleteBasket: (state, action) => {
      const currentBasket = state.basket.find(
        (item) => item.id === action.payload
      );
      const basketWithoutCurrent = state.basket.filter(
        (item) => item.id !== action.payload
      );
      currentBasket.amount -= 1;
      if (currentBasket.amount === 0) {
        setBasket([...basketWithoutCurrent]);
      } else {
        setBasket([...basketWithoutCurrent, currentBasket]);
      }

      alertify.error("Sepetten çıkarıldı");
    },
    changeAmount: (state, action) => {
      const { id1, targetValue, money } = action.payload;
      //todo money kontrol
      const checkBasket = state.basket.find((item) => item.id === id1);
      if (targetValue * id1 > money) {
        alert("Paranız yetmiyor");
      } else {
        if (targetValue >= 0) {
          if (checkBasket) {
            checkBasket.amount = +targetValue;
            state.basket = [
              ...state.basket.filter((item) => item.id !== id1),
              checkBasket,
            ];
          } else {
            state.basket = [
              ...state.basket,
              {
                id: id1,
                amount: +targetValue,
              },
            ];
          }
        } else return false;
      }
    },
    resetBasket: (state) => {
      state.basket = [];
      alertify.success("Sepet sıfırlandı");
    },
  },
});

export const { setBasket, deleteBasket, resetBasket, addBasket, changeAmount } =
  basket.actions;

export default basket.reducer;
