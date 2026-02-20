const Notification = ({ status, message }) => {
  if (message) return <p className={status}>{message}</p>;
};

export default Notification;
