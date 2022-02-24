import React from "react";
import headerLogo from "../images/header__logo.svg";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { Link, useHistory } from "react-router-dom";

function Header(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const history = useHistory();

  return (
    <header className="header">
      <img src={headerLogo} alt="Место" className="header__logo" />

      {props.name === "register" && (
        <Link to="/sign-in" className="header__link">
          Войти
        </Link>
      )}

      {props.name === "login" && (
        <Link to="/sign-up" className="header__link">
          Регистрация
        </Link>
      )}

      {props.name === "main" && (
        <div className="header__container">
          <p className="header__mail">{currentUser.email}</p>
          <button className="header__button" onClick={props.onClick}>
            Выйти
          </button>
        </div>
      )}
    </header>
  );
}

export default Header;
