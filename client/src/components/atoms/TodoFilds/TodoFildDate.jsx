import clsx from "clsx";
import PropTypes from "prop-types";
import s from "./TodoFilds.module.scss";
import InputCornerWrap from "@/components/atoms/Wrap/InputCornerWrap/InputCornerWrap";

const TodoFildDate = ({
  value,
  onChange,
  isVisible = true,
  wrapperClass = "",
  inputWrapClass = "",
  ...rest
}) => {
  return (
    <div
      className={clsx(s["todo__form__date"], wrapperClass, !isVisible && s["hidden"])}
    >
      <InputCornerWrap
        className={clsx(s["todo__input-wrap"], inputWrapClass)}
      />
      <input
        className={clsx(s["todo__form__date-input"], s["todo__input"])}
        type="date"
        value={value}
        onChange={onChange}
        {...rest}
      />
    </div>
  );
};

TodoFildDate.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  isVisible: PropTypes.bool,
  wrapperClass: PropTypes.string,
  inputWrapClass: PropTypes.string,
};

TodoFildDate.defaultProps = {
  isVisible: true,
  wrapperClass: "",
  inputWrapClass: "",
};

export default TodoFildDate;
