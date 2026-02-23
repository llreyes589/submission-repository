import axios from "axios";
const baseUrl = "/api/persons";

const getAll = () => {
  const response = axios.get(baseUrl);
  return response.then((response) => response.data);
};

const create = (newPhonebook) => {
  const response = axios.post(baseUrl, newPhonebook);
  return response.then((response) => response.data);
};

const deletePhonebook = (id) => {
  const response = axios.delete(`${baseUrl}/${id}`);
  return response.then((response) => response.data);
};

const updateNumber = (person, number) => {
  const response = axios.put(`${baseUrl}/${person.id}`, {
    name: person.name,
    number,
  });
  return response.then((response) => response.data);
};

export default {
  getAll,
  create,
  deletePhonebook,
  updateNumber,
};
