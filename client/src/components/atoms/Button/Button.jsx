import PropTypes from "prop-types";
import clsx from "clsx";
import s from "./Button.module.scss";

const Button = ({ name, onClick, extraClass, ...props }) => {
  return (
    <button className={clsx(s.btn, extraClass)} data-name={name} onClick={onClick} {...props}>
      {name}
    </button>
  );
};

Button.propTypes = {
  name: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  extraClass: PropTypes.string,
};

Button.defaultProps = { type: "button" }

export default Button;
