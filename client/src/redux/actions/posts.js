import { GET_POSTS, ADD_POST } from "../constants/posts";
import axios from "axios";

export const getPosts = () => (dispatch) => {
  return axios
    .get("/api/post")
    .then(function (response) {
      dispatch({
        type: GET_POSTS,
        payload: response.data,
      });
    })
    .catch(function (error) {
      console.log(error);
      return;
    });
};

export const addPost = (data) => (dispatch) => {
  return axios
    .post("/api/post", data)
    .then(function (response) {
      dispatch({
        type: ADD_POST,
        payload: response.data,
      });
    })
    .catch(function (error) {
      console.log(error);
    });
};
