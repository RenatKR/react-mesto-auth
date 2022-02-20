import React from "react";

export default function Login() {
  return (
    <section className="login">
      <div className="login__container">
        <form>
          <fieldset className="login__input-form">
            <input
              name="email"
              type="email"
              className="login__input login__input_type_email"
              placeholder="Email"
              minLength="2"
              maxLength="40"
              noValidate
              autoComplete="off"
              id="email-input"
              required
            ></input>
            <span className="login-input-email-error"></span>
            <input
              name="password"
              type="password"
              className="login__input login__input_type_password"
              placeholder="Пароль"
              minLength="2"
              maxLength="40"
              noValidate
              autoComplete="off"
              id="email-input"
              required
            ></input>
            <span className="login-input-email-error"></span>
          </fieldset>
          <button type="submit" className="login__button">
            Войти
          </button>
        </form>
      </div>
    </section>
  );
}
