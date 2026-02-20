const Persons = ({ persons, handleDeleteConfirmation }) => {
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
