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
  const [savedMovies, setSavedMovies] = React.useState([]);

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
  // const [loadMovies, setLoadMovies] = React.useState(()=> foundMovies.slice(0, num));

  function loadMore(){
      setLoadMovies([...loadMovies, ...foundMovies.slice(num, num + cardsInRow)]);
      setNum(num + cardsInRow);
  };

  React.useEffect(()=>{
    mainApi
     .getMovies()
     .then(res => {
        const result = res.map((item) => {
          item.id = item.movieId;
          return item;
        })
       console.log(result);
       setSavedMovies(result);
     })
     .catch(err=> console.log(err))
 },[])

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
        setFoundMovies([]);
        setLoadMovies([]);
        setNum(initialCount);
        setNotFoundMovie('');
        setSearch('');
        localStorage.clear();
      })
      .catch((err) => console.log(`Ошибка: ${err}. Не удалось выйти из приложения.`))
  }

  function searchMovies(search){
    setIsLoading(true)
    if(!localStorage.getItem('movies')){
      return moviesApi
        .getMovies()
        .then((movies) => {
          const resultmovie = movies.map((item)=> {
             item.image.url = `https://api.nomoreparties.co/${item.image.url}`;
             item.image.formats.thumbnail.url = `https://api.nomoreparties.co/${item.image.formats.thumbnail.url}`;
             item.isSaved = false;
             return item;
          })
          localStorage.setItem('movies', JSON.stringify(resultmovie));
          setMovies(resultmovie);
          localStorage.setItem('search', search);
          // setSearch(search)
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
      // setSearch(search)
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

  function saveMovie(likedMovie){
    return mainApi
    .like(likedMovie)
    .then(res=>{
      const result = foundMovies.map((foundMovie)=>{
        if(foundMovie.id === res.movieId){
          foundMovie._id = res._id;
          foundMovie.isSaved = true;
          return foundMovie;
        } else {
          return foundMovie;
        }
      })
      setFoundMovies(result);
      setSavedMovies([...savedMovies, res])
      // setFoundMovies((movies) => 
      // movies.map((m) => (m.id === res.movieId ? res : m)))
      // getMovies();
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



  // function getMovies(){
  //   return mainApi
  //     .getMovies()
  //     .then(res => {
  //       setSavedMovies([...savedMovies, res])
  //     })
  //     .catch(err=> console.log(err))
  // }

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
            saveMovie={saveMovie}
            search={search}
            setSearch={setSearch}
            deleteMovie={deleteMovie}
            />}
        />
        <Route 
          path="/saved-movies" 
          element={<ProtectedRouteElement 
            component={SavedMovies} 
            loggedIn={loggedIn} 
             movies={savedMovies}
             deleteMovie={deleteMovie}/>}
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
