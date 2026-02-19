const Filter = ({ searchString, handleSearchPerson }) => {
  //   setTimeout(() => {
  //     console.log("loop..");
  //     let i = 0;
  //     while (i < 99999999999) {
  //       i++;
  //     }
  //     console.log("end");
  //   }, 5000);
  return (
    <div>
      filter shown with
      <input value={searchString} onChange={handleSearchPerson} />
    </div>
  );
};

export default Filter;
