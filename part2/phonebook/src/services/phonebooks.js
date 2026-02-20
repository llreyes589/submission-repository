import axios from "axios";
const baseUrl = "http://localhost:3001/persons";

const getAll = () => {
  const response = axios.get(baseUrl);
  return response.then((response) => response.data);
};

const create = (newPhonebook) => {
  const response = axios.post(baseUrl, newPhonebook);
  return response.then((response) => response.data);
};

export default {
  getAll,
  create,
};
