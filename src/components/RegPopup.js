import rejectImg from "../images/reg-popup__reject.svg";
import confirmImg from "../images/reg-popup__confirm.svg";


export default function RegPopup(props) {
  return (
    <section className="popup">
      <div className="popup__container">
        <button
          className="popup__close"
          type="button"
          onClick={props.onClose}
        ></button>
        <div className="popup__content">
          <img src={rejectImg} alt="Ошибка" className="header__img" />
          <h2 className="popup__title">123</h2>
        </div>
      </div>
    </section>
  );
}
