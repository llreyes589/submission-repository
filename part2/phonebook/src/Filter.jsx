const Filter = ({ searchString, handleSearchPerson }) => {
  return (
    <div>
      filter shown with
      <input value={searchString} onChange={handleSearchPerson} />
    </div>
  );
};

export default Filter;
