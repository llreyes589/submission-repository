import axios from "axios";
const baseUrl = `https://api.open-meteo.com/v1/forecast`;

const getWeather = ([lat, long]) => {
  const response = axios.get(
    `${baseUrl}?latitude=${lat}&longitude=${long}&hourly=temperature_2m`,
  );
  return response.then((response) => response.data);
};

export default {
  getWeather,
};
