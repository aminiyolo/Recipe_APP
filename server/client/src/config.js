import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://aminiyolo-find-recipe.herokuapp.com",
});
