import React from "react";
import { useEffect } from "react";
import weatherService from "./services/weather";
import { useState } from "react";

const CountriesList = ({ setSearchString, countries }) => {
  if (countries.length >= 10)
    return <p>Too many matches, speify another filter</p>;
  else if (countries.length <= 10 && countries.length > 1)
    return (
      <ul>
        {countries.map((country) => (
          <li key={country.name.common}>
            <span>
              {country.name.common}{" "}
              <button onClick={() => setSearchString(country.name.common)}>
                Show
              </button>
            </span>
          </li>
        ))}
      </ul>
    );
  else if (countries.length === 1) {
    const [weather, setWeather] = useState(null);
    const { name, capital, area, languages, flags, latlng } = countries[0];

    useEffect(() => {
      const response = weatherService.getWeather(latlng);
      response.then((data) => {
        console.log({ data });
        setWeather(data.hourly.temperature_2m[0]);
      });
    }, []);

    return (
      <div>
        <h1>{name.common}</h1>
        <p>Capital {capital}</p>
        <p>Area {area}</p>
        <h1>Languages</h1>
        <ul>
          {Object.entries(languages).map(([key, language]) => (
            <li key={key}>{language}</li>
          ))}
        </ul>
        <img width="300" src={flags.svg} alt={flags.alt} />
        <h1>Weather in {capital}</h1>
        <p>Temperature {weather} Celcius</p>
      </div>
    );
  }
};

export default CountriesList;
