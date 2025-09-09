import Logo from "@/components/atoms/Logo/Logo";
import s from "./TodoHeader.module.scss";

import clsx from "clsx";
import PropTypes from 'prop-types';
import TodoAvatarMenu from "@/components/containers/TodoAvatarMenu";



const TodoHeader = ({ name, surname, plan }) => {
  return (
    <header className={`${s["header"]}`}>
      <div className={`${s["header-container"]} container`}>
        <div className={clsx(s["header__logo-plan"])}>
          <Logo />
          <div className={clsx(s["header__plan"])}>
            <p className={clsx(s["header__plan-text"], s["info__user"])}>{plan}</p>
          </div>
        </div>
        <div className={clsx(s["header__info"])}>
          <div className={clsx(s["header__info__fullname"])}>
            <p className={clsx(s["header__info__name"], s["info__user"])}>{name}</p>
            <p className={clsx(s["header__info__surname"], s["info__user"])}>{surname}</p>
          </div>
            <TodoAvatarMenu />
        </div>
      </div>
    </header>
  );
};

TodoHeader.propTypes = {
  name: PropTypes.string.isRequired,
  surname: PropTypes.string.isRequired,
  plan: PropTypes.string.isRequired,
}

export default TodoHeader;
