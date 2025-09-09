import PropTypes from "prop-types"
import clsx from "clsx"
import { useState } from "react"
import ActionPasswordIcon from "../Icon/Common/ActionPasswordIcon/ActionPasswordIcon"
import s from "./InputForm.module.scss"

const InputForm = ({ name, type, placeholder, value, onChange, autoComplete, inputClass }) => {
  const [showPassword, setShowPassword] = useState(false);
  const inputType = type === "password" && showPassword ? "text" : type;
  const formatted = name.replace(/^new_/, "").replace(/^./, c => c.toUpperCase());
  return (
  <div
    data-name={ formatted }
    className={clsx(s["form__field"])}
  >
    {type === "password" && (
        <button
          type="button"
          className={clsx(s["password-change__btn"])}
          onClick={() => setShowPassword(prev => !prev)}
        >
          <ActionPasswordIcon 
            isShow={showPassword}
            hiddenClass={clsx(s["password-change__icon--hidden"])} 
            showClass={clsx(s["password-change__icon--show"])}  />
        </button>
      )}

    {type === "textarea" ?
    (
    <textarea
      name={name}
      type={type}
      placeholder={placeholder}
      className={clsx(s["form__field-textarea"], inputClass)}
      value={value}
      onChange={e => onChange(e.target.value)}
      required
      autoComplete={autoComplete}
    />
  ) : (
      <input
      name={name}
      type={inputType}
      placeholder={placeholder}
      className={clsx(s["form__field-input"], inputClass)}
      value={value}
      onChange={e => onChange(e.target.value)}
      required={name !== "new_password"}
      autoComplete={autoComplete}
    />
  )}
  </div>
)}

InputForm.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  autoComplete: PropTypes.string,
  inputClass: PropTypes.string,
  avatarUrl: PropTypes.string,
}

export default InputForm