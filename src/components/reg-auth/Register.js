import React from "react";

export default function Register() {
  return (
    <section className="registration">
      <div className="registration__container">
        <form>
          <fieldset className="registration__input-form">
            <input
              name="email"
              type="email"
              className="registration__input registration__input_type_email"
              placeholder="Email"
              minLength="2"
              maxLength="40"
              noValidate
              autoComplete="off"
              id="email-input"
              required
            ></input>
            <span className="registration-input-email-error"></span>
            <input
              name="password"
              type="password"
              className="registration__input registration__input_type_password"
              placeholder="Пароль"
              minLength="2"
              maxLength="40"
              noValidate
              autoComplete="off"
              id="email-input"
              required
            ></input>
            <span className="registration-input-email-error"></span>
          </fieldset>
          <button type="submit" className="registration__button">
            Зарегистрироваться
          </button>
        </form>
      </div>
    </section>
  );
}
