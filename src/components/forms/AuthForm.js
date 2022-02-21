export default function AuthForm({name, buttonText, title, handleChangePassword, handleChangeEmail, handleSubmit}) {
  return (
    <section className="auth">
      <div className="auth__container">
        <h1 className="auth__title">{title}</h1>
        <form>
          <fieldset className="auth__input-form">
            <input
              name="email"
              type="email"
              className={`auth__input ${name}__input_type_email`}
              placeholder="Email"
              minLength="2"
              maxLength="40"
              noValidate
              autoComplete="off"
              id="email-input"
              required
              onChange={handleChangeEmail}
            ></input>
            <span className={`${name}-input-email-error`}></span>
            <input
              name="password"
              type="password"
              className={`auth__input ${name}__input_type_password`}
              placeholder="Пароль"
              minLength="2"
              maxLength="40"
              noValidate
              autoComplete="off"
              id="email-input"
              required
              onChange={handleChangePassword}
            ></input>
            <span className={`${name}-input-email-error`}></span>
          </fieldset>
          <button type="submit" className="auth__button" onSubmit={handleSubmit}>
            {buttonText}
          </button>
        </form>
        <p className="auth__text">Уже зарегистрированы? Войти</p>
      </div>
    </section>
  );
}
