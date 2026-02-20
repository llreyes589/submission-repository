import phonebookService from "./services/phonebooks";

const Persons = ({ persons, setPersons }) => {
  const handleDeleteConfirmation = (person) => () => {
    window.confirm(`Delete ${person.name}?`);
    const promise = phonebookService.deletePhonebook(person.id);
    promise.then((response) => {
      const newPersons = persons.filter((person) => person.id !== response.id);
      setPersons(newPersons);
    });
  };
  return (
    <>
      {persons.map((person) => (
        <div key={person.id}>
          <span>
            {person.name} {person.number}
          </span>
          <button onClick={handleDeleteConfirmation(person)}>delete</button>
        </div>
      ))}
    </>
  );
};

export default Persons;
