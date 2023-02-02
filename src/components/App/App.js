import React from 'react';
import { Routes, Route, useLocation, Navigate, useNavigate } from 'react-router-dom';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';
import PageNotFound from '../PageNotFound/PageNotFound';
import BurgerMenu from '../BurgerMenu/BurgerMenu';
import InfoTooltip from '../InfoToolTip/InfoToolTip';
import mainApi from '../../utils/MainApi';
import moviesApi from '../../utils/MoviesApi';
import ProtectedRouteElement from '../ProtectedRoute/ProtectedRoute';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import './App.css';

function App() {
  const [loggedIn, setLoggedIn] = React.useState(()=> localStorage.getItem('loggedIn'));
  const [movies, setMovies] = React.useState(()=> JSON.parse(localStorage.getItem('movies')));
  const [isBurgerMenuOpen, setIsBurgerMenuOpen] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState(()=> JSON.parse(localStorage.getItem("currentUser")));
  const [foundMovies, setFoundMovies] = React.useState([]);
  const [loadMovies, setLoadMovies] = React.useState([]);
  const [infoRegister, setInfoRegister] = React.useState({status: false, message: "", icon: ""});
  const [isFiltering, setIsFiltering] = React.useState(()=> localStorage.getItem('isFiltering'));
  const [isLoading, setIsLoading] = React.useState(false);
  const [notFoundMovie, setNotFoundMovie] = React.useState('');
  const [savedMovies, setSavedMovies] = React.useState([]);
  const [registerErrorMessage, setRegisterErrorMessage] = React.useState('');

  let location = useLocation();
  const navigate = useNavigate();
  const widthScreen = window.innerWidth;
  let initialCount; 
  let cardsInRow;
  
  if(widthScreen > 1100){
    initialCount = 12;
    cardsInRow = 3;
  } else if(widthScreen < 1100 && widthScreen > 690){
    initialCount = 8;
    cardsInRow = 2;
  } else if(widthScreen < 690){
    initialCount = 5;
    cardsInRow = 2;
  }

  const [num ,setNum] = React.useState(initialCount);

  function loadMore(){
    setLoadMovies([...loadMovies, ...foundMovies.slice(num, num + cardsInRow)]);
    setNum(num + cardsInRow);
  };

  React.useEffect(()=>{
    localStorage.setItem('isFiltering', false);
    setIsFiltering(false);
    if(loggedIn){
      mainApi
      .getMovies()
      .then(res => {
        const result = res.map((item) => {
          item.id = item.movieId;
          return item;
        })
        setSavedMovies(result);
      })
      .catch(err=> console.log(err))
    }
 },[loggedIn])

 React.useEffect(()=>{
  if(isFiltering){
    setLoadMovies(()=> foundMovies.filter((item)=> item.duration < 40).slice(0, num));
  } else {
    setLoadMovies(()=> foundMovies.slice(0, num));

  }
 }, [isFiltering, foundMovies, num])

  React.useEffect(()=>{
    setIsBurgerMenuOpen(false);
  }, [location])

  function openPopup(){
    setIsBurgerMenuOpen(true);
  }

  function closeAllPopups(){
    setIsBurgerMenuOpen(false);
    setInfoRegister(false);
  }

  function onRegister(email, password, name){
    return mainApi
      .register(email, password, name)
      .then((userData) => {
        if(userData){
          setInfoRegister({
            status: true,
            message: "Вы успешно зарегистрировались!",
            icon: "succes"
          })
        }
        setRegisterErrorMessage('');
        navigate("/signin");
      })
      .catch((err) => {
        if (err === '409') {
          setRegisterErrorMessage('Пользователь с таким email уже существует');
        } else {
          setRegisterErrorMessage('При регистрации пользователя произошла ошибка');
        }
        console.log(`Ошибка : ${err}`);
      })
  }

  function onLogin(email, password){
    return mainApi
      .login(email, password)
      .then((userData) => {
        setLoggedIn(true);
        setCurrentUser(userData);
        localStorage.setItem("currentUser", JSON.stringify(userData))
        localStorage.setItem("loggedIn", true);
        setRegisterErrorMessage('');
        navigate("/movies");        
      })
      .catch((err) => {
        if (err === '401') {
          setRegisterErrorMessage('Вы ввели неправильный логин или пароль. ');
        } else {
          setRegisterErrorMessage('При регистрации пользователя произошла ошибка');
        }
        console.log(`Ошибка : ${err}`);
      })
  }

  function onLogout(){
    return mainApi
      .logout()
      .then(res => {
        setCurrentUser(null);
        setLoggedIn(false);
        setFoundMovies([]);
        setLoadMovies([]);
        setNum(initialCount);
        setNotFoundMovie('');
        setSavedMovies([]);
        setMovies([]);
        localStorage.clear();
      })
      .catch((err) => console.log(`Ошибка: ${err}. Не удалось выйти из приложения.`))
  }

  function searchMovies(search){
    setIsLoading(true);
    if(!localStorage.getItem('movies')){
      return moviesApi
        .getMovies()
        .then((movies) => {
          const resultMovies = movies.map((item)=> {
             item.image.url = `https://api.nomoreparties.co/${item.image.url}`;
             item.image.formats.thumbnail.url = `https://api.nomoreparties.co/${item.image.formats.thumbnail.url}`;
             if(savedMovies.some((i) => i.movieId === item.id)){
              item._id = (savedMovies.find((i) => i.movieId === item.id))._id;
             }
             return item;
          })
          localStorage.setItem('movies', JSON.stringify(resultMovies));
          setMovies(resultMovies);
          found(search);
        })
        .catch((err)=> {
          if(err){
            setIsLoading(false);
            setNotFoundMovie('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз');
          }
          console.log(`Ошибка: ${err}`);
        })
    } else {
      found(search);
    }
  }

  function resetFoundMovies(){
    setFoundMovies([]);
    setLoadMovies([]);
    setNum(initialCount);
  }

  function found(search){
    resetFoundMovies();
    const filteredMovies = filterMovies(JSON.parse(localStorage.getItem('movies')), search);
    setFoundMovies(filteredMovies);
    setIsLoading(false);
    if(filteredMovies.length === 0){
      setNotFoundMovie('Ничего не найдено');
    } else {
      setNotFoundMovie('')}
  }

  function searchSavedMovies(search) {
    const filteredMovies = filterMovies(savedMovies, search);
    setSavedMovies(filteredMovies);
  }

  function filterMovies(movies, search) {
    if(isFiltering){
      const filteredMovies = movies.filter((movie) => {
        return movie.nameRU.toLowerCase().includes(search.toLowerCase()) || movie.nameEN.toLowerCase().includes(search.toLowerCase())
      })
      return filteredMovies.filter((i)=> i.duration < 40);
    } else {
      const filteredMovies = movies.filter((movie) => {
        return movie.nameRU.toLowerCase().includes(search.toLowerCase()) || movie.nameEN.toLowerCase().includes(search.toLowerCase())
      })
      return filteredMovies;
    } 
    
  }

  function handleChangeCheckbox() {
    setIsFiltering(!isFiltering);
  }

  function saveMovie(likedMovie){
    return mainApi
    .like(likedMovie)
    .then(res=>{
      const result = movies.map((movie)=>{
        if(movie.id === res.movieId){
          movie._id = res._id;
          return movie;
        } else {
          return movie;
          
        }
      })
      res.id = res.movieId;
      setFoundMovies(result);
      setSavedMovies([...savedMovies, res])
    })
    .catch(err => console.log(err))
  }

  function deleteMovie(movie) {
    return mainApi
    .deleteMovie(movie._id)
    .then((res)=> {
      const result = foundMovies.map((foundMovie)=>{
        if(foundMovie.id === res.movieId){
          foundMovie.isSaved = false;
          return foundMovie;
        } else {
          return foundMovie;
        }
      })
      setFoundMovies(result);
      setSavedMovies((savedmovies)=> savedmovies.filter((m)=> m._id !== res._id))
    })
    .catch(err=> console.log(err))
  }

  function onUpdateUser(name, email){
    return mainApi
    .updateUser(name, email)
    .then((userData) =>{
      setCurrentUser(userData);
      localStorage.setItem("currentUser", JSON.stringify(userData));
      setInfoRegister({
        status: true,
        message: "Профиль обновлен!",
        icon: "succes"
      })
      setRegisterErrorMessage('');
    })
    .catch((err) => {
      if (err === '409') {
        setRegisterErrorMessage('Пользователь с таким email уже существует.');
      } else {
        setRegisterErrorMessage('При обновлении профиля произошла ошибка');
      }
      console.log(`Ошибка : ${err}`);
    })
  }

  return ( 
    <div className="app">
      <CurrentUserContext.Provider value={currentUser}>
      {location.pathname !== "/404"?<Header loggedIn={loggedIn}  openPopup={openPopup}/> : null}
      <Routes>
        <Route 
          path="/" 
          element={<Main/>}/>
        <Route 
          path="/signup" 
          element={<Register
            onRegister={onRegister}
            registerErrorMessage={registerErrorMessage}
          />}
        />
        <Route 
          path="/signin" 
          element={<Login 
            onLogin={onLogin} 
            registerErrorMessage={registerErrorMessage}
          />}
        />
        <Route 
          path="/movies" 
          element={
          <ProtectedRouteElement 
            component={Movies}
            loggedIn={loggedIn}
            movies={loadMovies}
            foundMovies={foundMovies}
            loadMore={loadMore} 
            searchMovies={searchMovies}
            handleChangeCheckbox={handleChangeCheckbox}
            isLoading={isLoading}
            notFoundMovie={notFoundMovie}
            saveMovie={saveMovie}
            deleteMovie={deleteMovie}
            savedMovies={savedMovies}
          />}
        />
        <Route
          path="/saved-movies" 
          element={
          <ProtectedRouteElement 
            component={SavedMovies}
            loggedIn={loggedIn}
            movies={isFiltering? savedMovies.filter((item)=> item.duration < 40): savedMovies}
            searchSavedMovies={searchSavedMovies}
            deleteMovie={deleteMovie}
            handleChangeCheckbox={handleChangeCheckbox}
            savedMovies={savedMovies}
          />}
        />
        <Route 
          path="/profile" 
          element={<ProtectedRouteElement 
            component={Profile} 
            loggedIn={loggedIn}
            onLogout={onLogout}
            onUpdateUser={onUpdateUser}
            registerErrorMessage={registerErrorMessage}/>}
        />
        <Route 
          path="/404" 
          element={<PageNotFound/>}/>
        <Route 
         path="*" 
         element={<Navigate to="/404"/>}/>
      </Routes>
      {location.pathname === "/"|| location.pathname === "/movies"||location.pathname === "/saved-movies"?<Footer/> : null}
      <BurgerMenu 
        isOpen={isBurgerMenuOpen}
        onClose={closeAllPopups}
      />
      <InfoTooltip 
        onClose={closeAllPopups} 
        infoRegister={infoRegister} />
      </CurrentUserContext.Provider>
    </div>
  );
}
export default App;
