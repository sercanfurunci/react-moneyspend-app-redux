import { ADD_PHOTO, SET_PRODUCT } from "../actions/actions";

const initialState = {
  productList: [],
};

export const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PRODUCT:
      return {
        ...state,
        productList: action.payload,
      };
    case ADD_PHOTO:
      console.log(action.payload);

      return {
        ...state,
        productList: [
          ...state.productList,
          {
            id: action.payload.id,
            url: action.payload.url,
            title: action.payload.title,
          },
        ],
      };
    default:
      return state;
  }
};
