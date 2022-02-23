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
          console.log("123");
          return (
            <Link to="/sign-in" className="header__link">
              Войти
            </Link>
          );
        }
        if (props.name === "login") {
          return (
            <Link to="/sign-up" className="header__link">
              Регистрация
            </Link>
          );
        }
        return <p></p>;
      }} */}
    </header>
  );
}

export default Header;
