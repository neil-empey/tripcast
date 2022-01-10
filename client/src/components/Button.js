const Button = props => {
  return (
    <form onSubmit={props.function}>
      <button>{props.text}</button>
    </form>
  );
};

export default Button;
