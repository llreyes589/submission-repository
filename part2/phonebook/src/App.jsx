import { useState } from "react";
import Filter from "./Filter";
import PersonForm from "./PersonForm";
import Persons from "./Persons";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchString, setSearchString] = useState("");

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (persons.some((person) => person.name === newName))
      return alert(`${newName} is already added to phonebook`);
    setPersons(persons.concat({ name: newName, number: newNumber }));
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
