import { useState } from "react";
import Filter from "./Filter";
import PersonForm from "./PersonForm";
import Persons from "./Persons";
import axios from "axios";
import { useEffect } from "react";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchString, setSearchString] = useState("");

  useEffect(() => {
    const eventHandler = (response) => {
      setPersons(response.data);
    };
    const promise = axios.get("http://localhost:3001/persons");
    promise.then(eventHandler);
  }, []);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (persons.some((person) => person.name === newName))
      return alert(`${newName} is already added to phonebook`);
    const promise = axios.post("http://localhost:3001/persons", {
      name: newName,
      number: newNumber,
    });
    promise.then((response) => {
      const newPhonebook = {
        name: response.data.name,
        number: response.data.number,
      };
      setPersons([...persons, newPhonebook]);
    });
  };

  const handleSearchPerson = (e) => {
    const { value } = e.target;
    const filteredPersons = persons.filter((person) =>
      person.name.includes(value),
    );
    setSearchString(value);
    setPersons(value ? filteredPersons : persons);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter
        searchString={searchString}
        handleSearchPerson={handleSearchPerson}
      />
      <h2>Add new</h2>
      <PersonForm
        handleFormSubmit={handleFormSubmit}
        newName={newName}
        newNumber={newNumber}
        setNewName={setNewName}
        setNewNumber={setNewNumber}
      />
      <h2>Numbers</h2>
      <Persons persons={persons} />
    </div>
  );
};

export default App;
