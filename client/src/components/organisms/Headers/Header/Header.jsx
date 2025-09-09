import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import Logo from "@/components/atoms/Logo/Logo";
import Button from "@/components/atoms/Button/Button";
import Navbar from "@/components/molecules/Navbar/Navbar";
import s from "../Headers.module.scss";
import clsx from "clsx";

const Header = ({ isUser }) => {
  const navigate = useNavigate();
  const handleTodo = () => navigate("/todo");
  const handleLogin = () => navigate("/login");

  return (
    <header className={clsx(s["header"])}>
      <div className={clsx(s["header-container"], "container")}>
        <Logo />
        <div className={clsx(s["header-actions"])}>
          <Navbar />
          <div className={clsx(s["header-decor"])}></div>
          {isUser ?
            <Button name="Todo" onClick={handleTodo} />
           : <Button name="Log in" onClick={handleLogin} />
          }
        </div>
      </div>
    </header>
  );
};

Header.propTypes = {
  isUser: PropTypes.bool.isRequired,
}

export default Header;
