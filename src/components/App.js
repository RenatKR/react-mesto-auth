import React from "react";

import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";

import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";

import api from "../utils/Api";

//sprint 11

import { CurrentUserContext } from "../contexts/CurrentUserContext";

import EditProfilePopup from "./EditProfilePopup";

import EditAvatarPopup from "./EditAvatarPopup";

import AddPlacePopup from "./AddPlacePopup";

//sprint 12

import Login from "./reg-auth/Login";

import Register from "./reg-auth/Register";

import {
  Switch,
  Route,
  Redirect,
  withRouter,
  useHistory,
} from "react-router-dom";

import ProtectedRoute from "./ProtectedRoute";

import { authorize, register, getContent } from "../utils/ApiAuth";

import * as ApiAuth from "../utils/ApiAuth";

function App() {
  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);

  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);

  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);

  const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);

  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);

  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsImagePopupOpen(false);
    setIsInfoTooltipOpen(false);
    setSelectedCard({});
  };

  const [selectedCard, setSelectedCard] = React.useState({});

  function handleCardClick(src, title) {
    setSelectedCard({ src, title });
    setIsImagePopupOpen(true);
  }

  //Sprint 11

  const [currentUser, setCurrentUser] = React.useState({});

  React.useEffect(() => {
    api
      .getUserInfo()
      .then((data) => {
        setCurrentUser(old => ({
          ...old,
          _id: data._id,
          name: data.name,
          description: data.about,
          src: data.avatar,
        }));
      })
      .catch((err) => console.log(err));
  }, []);

  function handleUpdateUser(data) {
    api
      .editUserInfo(data)
      .then((data) => {
        setCurrentUser(old => ({
          ...old,
          id: data._id,
          name: data.name,
          description: data.about,
          src: data.avatar,
        }));
      })
      .then(() => {
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleUpdateAvatar(data) {
    api
      .editUserAva(data)
      .then((data) => {
        setCurrentUser(old => ({
          ...old,
          _id: data._id,
          name: data.name,
          description: data.about,
          src: data.avatar,
        }));
      })
      .then(() => {
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  //cards

  const [cards, setCards] = React.useState([]);

  function transformCard(item) {
    const a = {
      _id: item._id,
      src: item.link,
      title: item.name,
      likesNum: item.likes.length,
      likesArr: item.likes,
      owner: item.owner._id,
    };
    return a;
  }

  function handleCardLike(card) {
    const isLiked = card.likesArr.some((i) => i._id === currentUser._id);
    api
      .changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        const a = transformCard(newCard);
        setCards((state) => state.map((c) => (c._id === card._id ? a : c)));
      })
      .catch((err) => console.log(err));
  }

  const handleCardDelete = (card) => {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
      })
      .catch((err) => console.log(err));
  };

  React.useEffect(() => {
    api
      .getInitialCards()
      .then((data) => {
        // console.log(data)
        setCards(
          data.map((item) => ({
            _id: item._id,
            src: item.link,
            title: item.name,
            likesNum: item.likes.length,
            likesArr: item.likes,
            owner: item.owner._id,
          }))
        );
      })
      .catch((err) => console.log(err));
  }, []);

  function handleAddPlaceSubmit(card) {
    api
      .addNewCard(card)
      .then((card) => {
        const a = transformCard(card);
        setCards([a, ...cards]);
      })
      .then(() => {
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  //sprint 12

  const [loggedIn, setLoggedIn] = React.useState(true);

  const history = useHistory();

  React.useEffect(() => {
    handleTokenCheck();
  }, []);

  function handleTokenCheck() {
    if (!localStorage.getItem("jwt")) return;

    const jwt = localStorage.getItem("jwt");

    ApiAuth.checkToken(jwt)
      .then((res) => {
        if (!res) return;
        setLoggedIn(true);
        history.push("/");
      })
      .catch((err) => console.log(err));
  }

  function handleLogin(jwt) {
    if (!jwt) return;
    localStorage.setItem("jwt", jwt);
    setLoggedIn(true);
    history.push("/");
  }

  const [isInfoTooltipOpenOk, setIsInfoTooltipOpenOk] = React.useState();

  function handleRegister(password, email) {
    register(password, email)
      .then((res) => {
        if (res.ok) {
          setIsInfoTooltipOpen(true);
          setIsInfoTooltipOpenOk(true);
          return res.json();
        }
        if (!res.ok) {
          setIsInfoTooltipOpen(true);
          setIsInfoTooltipOpenOk(false);
        }
        return Promise.reject(res.status);
      })
      .then((data) => {
        console.log(data.data.email);
        setCurrentUser(old => ({
          ...old,
          email: data.data.email,
        }));
        console.log(currentUser.email);
        //setState({ ...state, message: " " });
        //props.handleRegister();
      })
      .catch(() => {
        //setState({ ...state, message: "Некорректно заполнено одно из полей" });
      });
  }

  return (
    <>
      <CurrentUserContext.Provider value={currentUser}>
        <div className="page">
          <Switch>
            <Route exact path="/">
              <ProtectedRoute loggedIn={loggedIn}>
                <Header name={"main"} />
                <Main
                  onEditProfile={handleEditProfileClick}
                  onEditAvatar={handleEditAvatarClick}
                  onAddPlace={handleAddPlaceClick}
                  handleCardClick={handleCardClick}
                  cards={cards}
                  onCardLike={handleCardLike}
                  onCardDelete={handleCardDelete}
                />
                <Footer />

                <EditProfilePopup
                  isOpen={isEditProfilePopupOpen}
                  onClose={closeAllPopups}
                  onUpdateUser={handleUpdateUser}
                />

                <EditAvatarPopup
                  isOpen={isEditAvatarPopupOpen}
                  onClose={closeAllPopups}
                  onUpdateAvatar={handleUpdateAvatar}
                />

                <AddPlacePopup
                  isOpen={isAddPlacePopupOpen}
                  onClose={closeAllPopups}
                  onAddPlace={handleAddPlaceSubmit}
                />
                <PopupWithForm
                  name="confirm"
                  title="Вы уверены?"
                ></PopupWithForm>
                <ImagePopup
                  src={selectedCard.src}
                  title={selectedCard.title}
                  isOpen={isImagePopupOpen}
                  onClose={closeAllPopups}
                  card={selectedCard}
                />
              </ProtectedRoute>
            </Route>

            <Route path="/sign-up">
              <Header name={"register"} />
              <Register
                handleRegister={handleRegister}
                isInfoTooltipOpen={isInfoTooltipOpen}
                closeAllPopups={closeAllPopups}
                isInfoTooltipOpenOk={isInfoTooltipOpenOk}
              />
            </Route>
            <Route path="/sign-in">
              <Header name={"login"} />
              <Login handleSubmit={handleLogin} />
            </Route>
          </Switch>
        </div>
      </CurrentUserContext.Provider>
    </>
  );
}

export default App;
