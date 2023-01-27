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
  const [search, setSearch] = React.useState(() => localStorage.getItem('search'));
  const [isBurgerMenuOpen, setIsBurgerMenuOpen] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState(null);
  const [foundMovies, setFoundMovies] = React.useState([]);
  const [loadMovies, setLoadMovies] = React.useState([]);
  const [infoRegister, setInfoRegister] = React.useState({status: false, message: "", icon: ""});
  const [isFiltering, setIsFiltering] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [notFoundMovie, setNotFoundMovie] = React.useState('');

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
    cardsInRow = 1;
  }

  const [num ,setNum] = React.useState(initialCount);
  // const [loadMovies, setLoadMovies] = React.useState(()=> foundMovies.slice(0, num));

  function loadMore(){
      setLoadMovies([...loadMovies, ...foundMovies.slice(num, num + cardsInRow)]);
      setNum(num + cardsInRow);
  };

 React.useEffect(()=>{
  if(foundMovies){
    setLoadMovies(()=> foundMovies.slice(0, num))
  }
 }, [foundMovies, num])

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
        navigate("/signin");
      })
      .catch((err) => {
        setInfoRegister({
          status: true,
          message: "Что-то пошло не так! Попробуйте еще раз.",
          icon: "fail",
        });
        console.log(`${err}. Некорректно заполнено одно из полей.`);
      })
  }

  function onLogin(email, password){
    return mainApi
      .login(email, password)
      .then((userData) => {
        setLoggedIn(true);
        setCurrentUser(email);
        localStorage.setItem("loggedIn", true)
        navigate("/movies");        
      })
      .catch((err) => {
        setInfoRegister({
          status: true,
          message: "Что-то пошло не так! Попробуйте еще раз.",
          icon: "fail",
        });
        console.log(`${err}. Некорректно заполнено одно из полей.`);
      })
  }

  function onLogout(){
    return mainApi
      .logout()
      .then(res => {
        setLoggedIn(false);
        localStorage.clear();
        setFoundMovies([]);
        setLoadMovies([]);
        setNum(initialCount);
        setNotFoundMovie('');
        // localStorage.removeItem("loggedIn");
        // localStorage.removeItem("movies");
        // localStorage.removeItem("search");
      })
      .catch((err) => console.log(`Ошибка: ${err}. Не удалось выйти из приложения.`))
  }

  function searchMovies(search){
    setIsLoading(true)
    if(!localStorage.getItem('movies')){
      return moviesApi
        .getMovies()
        .then((movies) => {
          localStorage.setItem('movies', JSON.stringify(movies));
          setMovies(movies);
          localStorage.setItem('search', search);
          setSearch(search)
          found(search);
        })
        .catch((err)=> {
          if(err){
            setNotFoundMovie('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз');
            setIsLoading(false)
          }
          console.log(`Ошибка: ${err}`);
        })
    } else {
      localStorage.setItem('search', search);
      setSearch(search)
      found(search);
    }
  }

  function found(search){
    setFoundMovies([]);
    setLoadMovies([]);
    setNum(initialCount);
    const filteredMovies = movies.filter((movie) => {
      return movie.nameRU.toLowerCase().includes(search.toLowerCase()) || movie.nameEN.toLowerCase().includes(search.toLowerCase())})
    setFoundMovies(filteredMovies);
    setIsLoading(false);
    if(filteredMovies.length === 0){
      console.log('не найден');
      setNotFoundMovie('Ничего не найдено');

    } else {
      console.log('найден');
      setNotFoundMovie('')}
  }

  function handleChangeCheckbox() {
    setIsFiltering(!isFiltering);
  }

  return ( 
    <div className="app">
      <CurrentUserContext.Provider value={currentUser}>
      {location.pathname !== "/404"?<Header loggedIn={loggedIn}  openPopup={openPopup}/> : null}
      <Routes>
        <Route path="/signup" element={<Register onRegister={onRegister}/>}/>
        <Route path="/signin" element={<Login onLogin={onLogin}/>}/>
        <Route path="/" element={<Main/>}/>
        <Route 
          path="/movies" 
          element={<ProtectedRouteElement 
            component={Movies} 
            loggedIn={loggedIn} 
            loadMore={loadMore} 
            movies={loadMovies}
            foundMovies={foundMovies}
            searchMovies={searchMovies}
            isFiltering = {isFiltering}
            handleChangeCheckbox={handleChangeCheckbox}
            isLoading={isLoading}
            notFoundMovie={notFoundMovie}

            />}
        />
        <Route 
          path="/saved-movies" 
          element={<ProtectedRouteElement 
            component={SavedMovies} 
            loggedIn={loggedIn} 
             movies={foundMovies}/>}
        />
        <Route 
          path="/profile" 
          element={<ProtectedRouteElement 
            component={Profile} 
            loggedIn={loggedIn}
            onLogout={onLogout}/>}
        />
        <Route path="/404" element={<PageNotFound/>}/>
        <Route path="*" element={<Navigate to="/404"/>}/>
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
