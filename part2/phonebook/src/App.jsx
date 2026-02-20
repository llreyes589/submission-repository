import { useState } from "react";
import Filter from "./Filter";
import PersonForm from "./PersonForm";
import Persons from "./Persons";
import { useEffect } from "react";
import phonebookService from "./services/phonebooks";
import Notification from "./Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchString, setSearchString] = useState("");
  const [formSuccess, setFormSuccess] = useState("");

  useEffect(() => {
    const eventHandler = (response) => {
      setPersons(response);
    };

    const promise = phonebookService.getAll();
    promise.then(eventHandler);
  }, []);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const person = persons.find((person) => person.name === newName);
    if (person) {
      const confirm = window.confirm(
        `${newName} is already added to phonebook. Replace the old number  with a new one?`,
      );

      if (confirm) {
        // update number service
        const promise = phonebookService.updateNumber(person, newNumber);
        promise.then((response) => {
          setPersons(
            persons.map((person) =>
              person.id === response.id ? response : person,
            ),
          );
        });
      }
      // return;
    } else {
      const responseHandler = (response) => {
        const newPhonebook = {
          id: response.id,
          name: response.name,
          number: response.number,
        };
        setPersons([...persons, newPhonebook]);
      };

      const newPerson = {
        name: newName,
        number: newNumber,
      };
      const promise = phonebookService.create(newPerson);
      promise.then(responseHandler);
      console.log({ newName });
    }
    setFormSuccess(`added ${newName}`);
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
      <Notification message={formSuccess} />
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
      <Persons persons={persons} setPersons={setPersons} />
    </div>
  );
};

export default App;
