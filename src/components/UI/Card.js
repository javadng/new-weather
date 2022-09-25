const Card = props => {
  return (
    <div
      className={`${
        props.className || ''
      } text-white relative w-3/4 max-w-4xl mx-auto my-5`}
    >
      {props.children}
    </div>
  );
};
export default Card;
