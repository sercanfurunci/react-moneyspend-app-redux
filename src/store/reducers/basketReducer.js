import {
  ADD_BASKET,
  DELETE_BASKET,
  CHANGE_AMOUNT,
  RESET_BASKET,
} from "../actions/actions";

const initialState = {
  basket: [],
};

export const basketReducer = (state = initialState, action) => {
  const checkBasket = state.basket?.find((item) => item.id === action.payload);
  switch (action.type) {
    case ADD_BASKET:
      if (checkBasket) {
        console.log("checked");
        checkBasket.amount += 1;
        return {
          ...state,
          basket: [
            ...state.basket.filter((item) => item.id !== action.payload),
            checkBasket,
          ],
        };
      } else {
        return {
          ...state,
          basket: [
            ...state.basket.filter((item) => item.id !== action.payload),
            {
              id: action.payload,
              amount: 1,
            },
          ],
        };
      }

    case DELETE_BASKET:
      const currentBasket = state.basket.find(
        (item) => item.id === action.payload
      );
      const basketWithoutCurrent = state.basket.filter(
        (item) => item.id !== action.payload
      );

      currentBasket.amount -= 1;
      if (currentBasket.amount === 0) {
        return {
          ...state,
          basket: [...basketWithoutCurrent],
        };
      } else {
        return {
          ...state,
          basket: [...basketWithoutCurrent, currentBasket],
        };
      }

    case CHANGE_AMOUNT:
      const { id, targetValue, money, total } = action.payload;
      console.log(action);
      if (targetValue * id > money - total) {
        alert("Paranız yetmiyor");
      } else {
        if (targetValue) {
          if (checkBasket) {
            checkBasket.amount = +targetValue;
            return {
              ...state,
              basket: [
                ...state.basket.filter((item) => item.id !== id),
                checkBasket,
              ],
            };
          } else {
            return {
              ...state,
              basket: [
                {
                  id,
                  amount: +targetValue,
                },
                ...state.basket.filter((item) => item.id !== id),
              ],
            };
          }
        } else return false;
        if (checkBasket.amount === 0) {
        }
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
