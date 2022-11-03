import {
  SET_TOTAL,
  SET_MONEY,
  SET_ADMIN,
  SET_BASKET,
  ADD_BASKET,
  DELETE_BASKET,
  CHANGE_AMOUNT,
  RESET_BASKET,
} from "../actions/actions";

import { setBasket } from "../actions/actions";

const initialState = {
  admin: false,
  basket: [],
  money: 100000,
  total: 0,
};

export const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ADMIN:
      return {
        ...state,
        admin: !state.admin,
      };
    case SET_MONEY:
      return {
        ...state,
        money: action.payload,
      };
    case SET_TOTAL:
      return {
        total: action.payload,
      };
    case SET_BASKET:
      return {
        ...state,
        basket: action.payload,
      };
    case ADD_BASKET: //todo
      const checkBasket =
        state.basket.length > 0 &&
        state.basket.find((item) => item.id === action.payload);

      // ürün daha önce eklenmiş
      if (checkBasket) {
        checkBasket.amount += 1;
        return {
          basket: [
            ...state.basket.filter((item) => item.id !== action.payload),
            checkBasket,
          ],
        };
      } else {
        return {
          basket: [
            ...state.basket,
            {
              id: action.payload,
              amount: 1,
            },
          ],
        };
      }

    case DELETE_BASKET: //todo
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

    case CHANGE_AMOUNT: //todo
      const { id1, targetValue, money, total } = action.payload;

      if (targetValue * id1 > money - total) {
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
    case RESET_BASKET:
      return {
        ...state,
        basket: [],
      };

    default:
      return state;
  }
};
