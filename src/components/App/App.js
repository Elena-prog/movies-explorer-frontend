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
import {
  EMAIL_EXIST_ERROR, 
  PROFILE_ERROR, 
  NOT_FOUND_ERROR, 
  SERVER_ERROR, 
  REGISTER_ERROR, 
  EMAIL_OR_PASSWORD_ERROR,
  SUCCES_REGISTRATION,
  SUCCES_UPDATE_PROFILE,
  SINGOUT_ERROR,
  INITIAL_COUNT_CARDS_DESKTOP,
  INITIAL_COUNT_CARDS_TABLET,
  INITIAL_COUNT_CARDS_MOBILE,
  CARDS_IN_ROW_DESKTOP,
  CARDS_IN_ROW_TABLET,
  CARDS_IN_ROW_MOBILE,
  SHORTS_MOVIE_DURATION
} from '../../constants';
import './App.css';

function App() {
  const [loggedIn, setLoggedIn] = React.useState(()=> localStorage.getItem('loggedIn'));
  const [movies, setMovies] = React.useState(()=> JSON.parse(localStorage.getItem('movies')));
  const [search, setSearch] = React.useState(() => localStorage.getItem('search')|| '');
  const [isBurgerMenuOpen, setIsBurgerMenuOpen] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState(()=> JSON.parse(localStorage.getItem("currentUser")));
  const [foundMovies, setFoundMovies] = React.useState(()=> JSON.parse(localStorage.getItem('foundMovies')) || []);
  const [loadMovies, setLoadMovies] = React.useState([]);
  const [infoRegister, setInfoRegister] = React.useState({status: false, message: "", icon: ""});
  const [isFiltering, setIsFiltering] = React.useState(()=> localStorage.getItem('isFiltering') === "true"? true: false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [notFoundMovieError, setNotFoundMovieError] = React.useState('');
  const [savedMovies, setSavedMovies] = React.useState([]);
  const [foundSavedMovies, setFoundSavedMovies] = React.useState([]);
  const [registerErrorMessage, setRegisterErrorMessage] = React.useState('');
  const navigate = useNavigate();
  const widthScreen = window.innerWidth;
  let location = useLocation();
  let initialCount; 
  let cardsInRow;
  
  if(widthScreen > 1100){
    initialCount = INITIAL_COUNT_CARDS_DESKTOP;
    cardsInRow = CARDS_IN_ROW_DESKTOP;
  } else if(widthScreen < 1100 && widthScreen > 690){
    initialCount = INITIAL_COUNT_CARDS_TABLET;
    cardsInRow = CARDS_IN_ROW_TABLET;
  } else if(widthScreen < 690){
    initialCount = INITIAL_COUNT_CARDS_MOBILE;
    cardsInRow = CARDS_IN_ROW_MOBILE;
  }

  const [num ,setNum] = React.useState(initialCount);

  function loadMore(){
    setLoadMovies([...loadMovies, ...foundMovies.slice(num, num + cardsInRow)]);
    setNum(num + cardsInRow);
  };

  React.useEffect(()=>{
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
    setLoadMovies(()=> foundMovies.filter((item)=> item.duration <= SHORTS_MOVIE_DURATION).slice(0, num));
  } else {
    setLoadMovies(()=> foundMovies.slice(0, num));
  }
 }, [isFiltering, foundMovies, num])

  React.useEffect(()=>{
    setIsBurgerMenuOpen(false);
    setFoundSavedMovies(savedMovies);
    setRegisterErrorMessage('');
  }, [location, savedMovies])

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
            message: SUCCES_REGISTRATION,
            icon: "succes"
          })
        }
        setRegisterErrorMessage('');
        onLogin(email, password);
      })
      .catch((err) => {
        if (err === '409') {
          setRegisterErrorMessage(EMAIL_EXIST_ERROR);
        } else {
          setRegisterErrorMessage(REGISTER_ERROR);
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
          setRegisterErrorMessage(EMAIL_OR_PASSWORD_ERROR);
        } else {
          setRegisterErrorMessage(REGISTER_ERROR);
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
        setNotFoundMovieError('');
        setSavedMovies([]);
        setMovies([]);
        setSearch('');
        setIsFiltering(false);
        localStorage.clear();
      })
      .catch((err) => console.log(`Ошибка: ${err}. ${SINGOUT_ERROR}`))
  }

  function handleSearchMovies(search){
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
          localStorage.setItem('search', search);
          setSearch(search);
          findMovies(search);
        })
        .catch((err)=> {
          if(err){
            setIsLoading(false);
            setNotFoundMovieError(SERVER_ERROR);
          }
          console.log(`Ошибка: ${err}`);
        })
    } else {
      localStorage.setItem('search', search);
      findMovies(search);
    }
  }

  function findMovies(search){
    resetFoundMovies();
    const filteredMovies = filterMovies(JSON.parse(localStorage.getItem('movies')), search);
    localStorage.setItem('foundMovies', JSON.stringify(filteredMovies));
    setFoundMovies(filteredMovies);
    setIsLoading(false);
    if(filteredMovies.length === 0){
      setNotFoundMovieError(NOT_FOUND_ERROR);
    } else {
      setNotFoundMovieError('')}
  }

  function resetFoundMovies(){
    setFoundMovies([]);
    setLoadMovies([]);
    setNum(initialCount);
  }

  function handleSearchSavedMovies(search) {
    const filteredMovies = filterMovies(savedMovies, search);
    setFoundSavedMovies(filteredMovies);
  }

  function filterMovies(allMovies, search) {
    const filteredMovies = allMovies.filter((movie) => {
      return movie.nameRU.toLowerCase().includes(search.toLowerCase()) || movie.nameEN.toLowerCase().includes(search.toLowerCase())
    })
    return filteredMovies;
  }

  function handleChangeCheckbox(e) {
    setIsFiltering(!isFiltering)
    localStorage.setItem('isFiltering', !isFiltering);
  }

  function handleCardLike(likedMovie){
    return mainApi
    .like(likedMovie)
    .then(res=>{
      const result = foundMovies.map((movie)=>{
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

  function handleCardDelete(movie) {
    return mainApi
    .deleteMovie(movie._id)
    .then((res)=> {
      setSavedMovies((savedmovies)=> savedmovies.filter((m)=> m._id !== res._id))
    })
    .catch(err=> console.log(err))
  }

  function handleUpdateUser(name, email){
    return mainApi
    .updateUser(name, email)
    .then((userData) =>{
      setCurrentUser(userData);
      localStorage.setItem("currentUser", JSON.stringify(userData));
      setInfoRegister({
        status: true,
        message: SUCCES_UPDATE_PROFILE,
        icon: "succes"
      })
      setRegisterErrorMessage('');
    })
    .catch((err) => {
      if (err === '409') {
        setRegisterErrorMessage(EMAIL_EXIST_ERROR);
      } else {
        setRegisterErrorMessage(PROFILE_ERROR);
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
        {!loggedIn && <Route 
          path="/signup" 
          element={<Register
            onRegister={onRegister}
            registerErrorMessage={registerErrorMessage}
          />}
        />}
        {!loggedIn && <Route 
          path="/signin" 
          element={<Login 
            onLogin={onLogin} 
            registerErrorMessage={registerErrorMessage}
          />}
        />}
        <Route 
          path="/movies" 
          element={
          <ProtectedRouteElement 
            component={Movies}
            loggedIn={loggedIn}
            movies={loadMovies}
            foundMovies={isFiltering? foundMovies.filter((item)=> item.duration <= SHORTS_MOVIE_DURATION): foundMovies}
            loadMore={loadMore} 
            onSearchMovies={handleSearchMovies}
            onChangeCheckbox={handleChangeCheckbox}
            isLoading={isLoading}
            notFoundMovieError={notFoundMovieError}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
            isFiltering={isFiltering}
            savedMovies={savedMovies}
            search={search} 
            setSearch={setSearch} 
          />}
        />
        <Route
          path="/saved-movies" 
          element={
          <ProtectedRouteElement 
            component={SavedMovies}
            loggedIn={loggedIn}
            movies={foundSavedMovies}
            onSearchSavedMovies={handleSearchSavedMovies}
            onCardDelete={handleCardDelete}
          />}
        />
        <Route 
          path="/profile" 
          element={<ProtectedRouteElement 
            component={Profile} 
            loggedIn={loggedIn}
            onLogout={onLogout}
            onUpdateUser={handleUpdateUser}
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