import React from "react";
import Search from "./Search";
import CountriesList from "./CountriesList";
import { useState } from "react";
import { useEffect } from "react";
import coutriesService from "./services/countries";

const App = () => {
  const [searchString, setSearchString] = useState("");
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);

  useEffect(() => {
    const response = coutriesService.getAll();
    response.then((data) => setCountries(data));
  }, []);

  useEffect(() => {
    if (searchString) {
      setFilteredCountries(
        countries.filter((country) =>
          country.name.common
            .toLowerCase()
            .includes(searchString.toLowerCase()),
        ),
      );
    }
  }, [searchString]);

  const onSearch = (event) => {
    event.preventDefault();
    setSearchString(event.target.value);
  };

  return (
    <div>
      <Search searchString={searchString} setSearchString={onSearch} />
      <CountriesList
        setSearchString={setSearchString}
        countries={filteredCountries}
      />
    </div>
  );
};

export default App;
