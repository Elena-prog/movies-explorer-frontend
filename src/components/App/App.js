import React from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
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
import movies from "../../tempDB";
import InfoTooltip from '../InfoToolTip/InfoToolTip';
import './App.css';

function App() {
  const [isBurgerMenuOpen, setIsBurgerMenuOpen] = React.useState(false);
  const [infoRegister, setInfoRegister] = React.useState({
    status: false,
    message: "Что-то пошло не так.",
    icon: "fail",
  });

  let location = useLocation();

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

  const [num ,setNum] = React.useState(initialCount)
  const [loadMovies, setLoadMovies] = React.useState(()=> movies.slice(0, num));


  function loadMore(){
      setLoadMovies([...loadMovies, ...movies.slice(num, num + cardsInRow)]);
      setNum(num + cardsInRow);
      console.log(loadMovies);
  };

  return ( 
    <div className="app">
      {location.pathname !== "/404"?<Header openPopup={openPopup}/> : null}
      <Routes>
        <Route path="/signup" element={<Register/>}/>
        <Route path="/signin" element={<Login/>}/>
        <Route path="/" element={<Main/>}/>
        <Route path="/movies" element={<Movies movies={loadMovies} loadMore={loadMore}/>}/>
        <Route path="/saved-movies" element={<SavedMovies movies={movies}/>}/>
        <Route path="/profile" element={<Profile/>}/>
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
    </div>
  );
}
export default App;
