import axios from "axios";

export const api = axios.create({
  baseURL: "https://crudcrud.com/api/92d3004d3351426cb48dbb653eafb659",
  timeout: 12000,
});
