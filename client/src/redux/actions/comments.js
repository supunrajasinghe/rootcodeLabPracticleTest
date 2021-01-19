import { ADD_COMMENT } from "../constants/comments";
import axios from "axios";

export const addComment = (data) => (dispatch) => {
  return axios
    .post("/api/comment", data)
    .then(function (response) {
      dispatch({
        type: ADD_COMMENT,
        payload: response.data,
      });
    })
    .catch(function (error) {
      console.log(error);
    });
};
