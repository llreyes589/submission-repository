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
  const [formStatus, setFormStatus] = useState({
    message: "",
    status: "success",
  });

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
        promise
          .then((response) => {
            setPersons(
              persons.map((person) =>
                person.id === response.id ? response : person,
              ),
            );
          })
          .catch((error) =>
            setFormStatus({
              message: `Information of ${person.name} has already been removed from server.`,
              status: "error",
            }),
          );
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
    }
    setFormStatus({ message: `added ${newName}`, status: "success" });
  };

  const handleSearchPerson = (e) => {
    const { value } = e.target;
    const filteredPersons = persons.filter((person) =>
      person.name.includes(value),
    );
    setSearchString(value);
    setPersons(value ? filteredPersons : persons);
  };

  const handleDeleteConfirmation = (person) => () => {
    const confirm = window.confirm(`Delete ${person.name}?`);
    if (confirm) {
      const promise = phonebookService.deletePhonebook(person.id);
      promise.then((response) => {
        const newPersons = persons.filter(
          (person) => person.id !== response.id,
        );
        setPersons(newPersons);
      });
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={formStatus.message} status={formStatus.status} />
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
      <Persons
        persons={persons}
        setPersons={setPersons}
        handleDeleteConfirmation={handleDeleteConfirmation}
      />
    </div>
  );
};

export default App;
