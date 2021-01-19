import { GET_POSTS } from "../constants/posts";

const initialState = {
  postList: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_POSTS:
      return {
        ...state,
        postList: action.payload,
      };
    default:
      return state;
  }
};
