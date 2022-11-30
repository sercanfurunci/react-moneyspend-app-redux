import {
  SET_TOTAL,
  SET_ADMIN,
} from "../actions/actions";

const initialState = {
  admin: false,
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
    case SET_TOTAL:
      return {
        ...state,
        total: action.payload,
      };

    default:
      return state;
  }
};
