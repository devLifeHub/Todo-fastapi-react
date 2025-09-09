import { useNavigate } from "react-router-dom";
import Logo from "@/components/atoms/Logo/Logo";
import Button from "@/components/atoms/Button/Button";
import s from "./AuthHeader.module.scss";

const AuthHeader = () => {
  const navigate = useNavigate();

  const handleBack = () => navigate("/");

  return (
    <header className={`${s["header"]}`}>
      <div className={`${s["header-container"]} container`}>
        <Logo />
        <div className={`${s["header-decor"]}`}></div>
        <Button name="Back" extraClass={s["header-btn"]} onClick={handleBack} />
      </div>
    </header>
  );
};

export default AuthHeader;
