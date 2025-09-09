import PropTypes from "prop-types";
import s from './AuthPrompt.module.scss';
import Button from "@/components/atoms/Button/Button"; 
import { authLoginData, authRegisterData } from "@/storeData";

const AuthContentPrompt = ({ title, text, btn, toggleForm }) => {
  return (
    <div className={s["auth-prompt"]}>
      <div className={s["auth-prompt__content"]}>
        <div className={s["auth-prompt__content__descr"]}>
          <h2 className={s["auth-prompt__content__descr-title"]}>{title}</h2>
          <p className={s["auth-prompt__content__descr-text"]}>{text}</p>
        </div>
        <Button name={btn} onClick={toggleForm} />
      </div>
    </div>
  );
};

AuthContentPrompt.propTypes = {
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  btn: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  toggleForm: PropTypes.func.isRequired,
};

const AuthPrompt = ({ toggleForm }) => {
  return (
    <div className={s["auth-prompt"]}>
      <AuthContentPrompt {...authRegisterData} toggleForm={toggleForm} />
      <AuthContentPrompt {...authLoginData} toggleForm={toggleForm} />
    </div>
  );
};

AuthPrompt.propTypes = {
  toggleForm: PropTypes.func.isRequired,
};

export default AuthPrompt;