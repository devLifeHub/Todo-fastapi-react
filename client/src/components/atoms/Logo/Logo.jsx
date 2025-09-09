import clsx from "clsx";
import LogoSVG from "../../../assets/todo-logo.svg?react";
import s from "./Logo.module.scss";

const Logo = () => {
  return (
    <div className={clsx(s["logo-wrap"])}>
      <LogoSVG className={clsx(s["logo"])}  />
    </div>
  );
};

export default Logo;
