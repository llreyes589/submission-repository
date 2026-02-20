import React from "react";

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
    const country = countries[0];
    return (
      <div>
        <h1>{country.name.common}</h1>
        <p>Capital {country.capital}</p>
        <p>Area {country.area}</p>
        <h1>Languages</h1>
        <ul>
          {Object.entries(country.languages).map(([key, language]) => (
            <li key={key}>{language}</li>
          ))}
        </ul>
        <img src={country.flags.svg} alt={country.flags.alt} />
      </div>
    );
  }
};

export default CountriesList;
