import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://aminiyo-find-recipe.herokuapp.com/",
});
