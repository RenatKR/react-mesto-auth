import headerLogo from "../images/header__logo.svg";
import { Link } from "react-router-dom";

function Header(props) {
  return (
    <header className="header">
      <img src={headerLogo} alt="Место" className="header__logo" />
      {props.name === "register" ? (
        <Link to="/sign-in" className="header__link">
          Войти
        </Link>
      ) : (
        <Link to="/sign-up" className="header__link">
          Регистрация
        </Link>
      )}
      {/* {() => {
        if (props.name === "register") {
          <Link to="/sign-in" className="header__link">
            Войти
          </Link>;
          return;
        }
        if (props.name === "login") {
          <Link to="/sign-up" className="header__link">
            Регистрация
          </Link>;
          return;
        }

        return <p></p>;
      }} */}
    </header>
  );
}

export default Header;
