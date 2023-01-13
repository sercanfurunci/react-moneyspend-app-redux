import { ADD_PHOTO, EDIT_PRODUCT, SET_PRODUCT } from "../actions/actions";
import React from "react";

const initialState = {
  productList: [],
};

export const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PRODUCT:
      const products = action.payload.map((p) => {
        return {
          id: p.id,//unique id
          price: p.id,
          title: p.title,
          url: p.url,
        };
      });
      return {
        ...state,
        productList: products,
      };


    case ADD_PHOTO:

      return {
        ...state,
        productList: [
          ...state.productList,
          {
            id: action.payload.id, // uid olsun
            price: action.payload.price,
            url: action.payload.url,
            title: action.payload.title,
          },
        ],
      };
    case EDIT_PRODUCT:

      const newPhotos = state.productList.map((photo) => {
        if (photo.id === action.payload.id) {
          return {
            ...photo,
            price: action.payload.price,
            title: action.payload.title,
            url: action.payload.url,
          };
        }
        return photo;
      });
      return {
        ...state,
        productList: [...newPhotos],
      };
    default:
      return state;
  }
};
