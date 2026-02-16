const Total = (props) => {
  const sum = (parts) => {
    let total = 0;
    parts.forEach((part) => {
      total = total + part.exercises;
    });
    return total;
  };
  return <p>Number of exercises {sum(props.parts)}</p>;
};

export default Total;
