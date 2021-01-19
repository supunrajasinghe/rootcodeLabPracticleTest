import { ADD_COMMENT } from "../constants/comments";

const initialState = {
  postList: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_COMMENT:
      return {
        ...state,
        postList: action.payload,
      };
    default:
      return state;
  }
};
