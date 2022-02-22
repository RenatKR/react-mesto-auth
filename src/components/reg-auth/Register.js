import React from "react";
import AuthForm from "../forms/AuthForm";
import { register } from "../../utils/ApiAuth";

export default function Register(props) {
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
    console.log(password);
    if (!password || !email) return;
    register(password, email)
      .then((data) => {
        console.log(data);
        setState({ ...state, message: " " });
        props.handleRegister();
      })
      .catch(() =>
        setState({ ...state, message: "Некорректно заполнено одно из полей" })
      );
  }

  return (
    <>
      <AuthForm
        name={"register"}
        title={"Регистрация"}
        buttonText={"Зарегистрироваться"}
        handleChangePassword={handleChange}
        handleChangeEmail={handleChange}
        handleSubmit={handleSubmit}
      />
    </>
  );
}
