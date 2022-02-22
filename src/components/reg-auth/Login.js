import React from "react";
import AuthForm from "../forms/AuthForm";
import * as ApiAuth from "../../utils/ApiAuth";
import { Link, withRouter } from "react-router-dom";

export default function Login(props) {
  const [state, setState] = React.useState({
    password: " ",
    email: " ",
    message: " ",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setState({
      ...state,
      [name]: value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const { password, email } = state;
    if (!password || !email) return;
    ApiAuth.authorize(password, email)
      .then((data) => {
        if (!data.jwt) {
          setState({ ...state, message: "Что-то пошло не так" });
          return;
        }
        setState({ password: " ", email: " ", message: " " }, () => {
          props.handleLogin(data.jwt);
        });
      })
      .catch((err) => console.log(err));
  }

  return (
    <>
      <AuthForm
        name={"login"}
        title={"Вход"}
        buttonText={"Войти"}
        handleChangePassword={handleChange}
        handleChangeEmail={handleChange}
        handleSubmit={handleSubmit}
      />
    </>
  );
}
