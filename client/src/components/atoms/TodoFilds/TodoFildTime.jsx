import clsx from "clsx";
import PropTypes from "prop-types";
import s from "./TodoFilds.module.scss";
import InputCornerWrap from "@/components/atoms/Wrap/InputCornerWrap/InputCornerWrap";

const TodoFildTime = ({
  value,
  onChange,
  isVisible,
  wrapperClass,
  inputWrapClass,
  step
}) => {
  return (
    <div
      className={clsx(s["todo__form__time"], wrapperClass, !isVisible && s["hidden"])}
    >
      <InputCornerWrap
        className={clsx(s["todo__input-wrap"], inputWrapClass)}
      />
      <input
        className={clsx(s["todo__form__time-input"], s["todo__input"])}
        type="time"
        value={value}
        onChange={onChange}
        step={step}
      />
    </div>
  );
};

TodoFildTime.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  isVisible: PropTypes.bool,
  wrapperClass: PropTypes.string,
  inputWrapClass: PropTypes.string,
  step: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

TodoFildTime.defaultProps = {
  isVisible: true,
  wrapperClass: "",
  inputWrapClass: "",
  step: "1"
};

export default TodoFildTime;
