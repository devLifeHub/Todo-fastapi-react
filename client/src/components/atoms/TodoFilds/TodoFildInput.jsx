import clsx from "clsx";
import PropTypes from "prop-types";
import s from "./TodoFilds.module.scss";
import InputCornerWrap from "@/components/atoms/Wrap/InputCornerWrap/InputCornerWrap";


const TodoFildInput = ({value, onChange, placeholder, required = true, wrapperClass, inputWrapClass, cornerClass, dataName}) => {
    return (
        <div data-name={dataName} className={clsx(s["todo__form__title"], wrapperClass)}>
            <InputCornerWrap
                className={clsx(s["todo__input-wrap"], inputWrapClass)}
                extraClass={clsx(s["wrap-corner"], cornerClass)}
            />
            <input
                type="text"
                className={clsx(s["todo__form__title-input"], s["todo__input"])}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                required={required}
            />
        </div>
    );
};

TodoFildInput.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  wrapperClass: PropTypes.string,
  inputWrapClass: PropTypes.string,
  cornerClass: PropTypes.string,
  dataName: PropTypes.string
};


export default TodoFildInput;
