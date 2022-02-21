import React from "react";
import AuthForm from "../forms/AuthForm";

export default function Register({handleSubmit}) {
  const [password, setPassword] = React.useState("");
  const [email, setEmail] = React.useState("");

  function handleChangePassword(e) {
    console.log(e.target.value)
    setPassword(e.target.value);
  }

  function handleChangeEmail(e) {
    console.log(e.target.value)
    setEmail(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
  }

  return (
    <>
      <AuthForm
        name={"register"}
        title={"Регистрация"}
        buttonText={"Зарегистрироваться"}
        handleChangePassword={handleChangePassword}
        handleChangeEmail={handleChangeEmail}
        handleSubmit={handleSubmit}
      />
    </>
  );
}
