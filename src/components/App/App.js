import React from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import Movies from '../Movies/Movies';
// import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';
import PageNotFound from '../PageNotFound/PageNotFound';
import BurgerMenu from '../BurgerMenu/BurgerMenu';
import movies from "../../tempDB";
import './App.css';

function App() {
  let location = useLocation();

  React.useEffect(()=>{
    closeAllPopups();
  }, [location])

  const [isBurgerMenuOpen, setIsBurgerMenuOpen] = React.useState(false);

  function openPopup(){
    setIsBurgerMenuOpen(true);
  }

  function closeAllPopups(){
    setIsBurgerMenuOpen(false);
  }

  function onSaveClick(){
    //сохраняем фильмы
  }

  function onDeleteClick(){
    //удаляем фильмы из сохраненных
  }

  return (
    <div className='app'>
      {location.pathname !== "/404"?<Header openPopup={openPopup}/> : null}
      <Routes>
        <Route path='/signup' element={<Register/>}/>
        <Route path='/signin' element={<Login/>}/>
        <Route path='/' element={<Main/>}/>
        <Route path='/movies' element={<Movies onSaveClick={onSaveClick} movies={movies}/>}/>
        {/* <Route path='/saved-movies' element={<SavedMovies onSaveClick={onDeleteClick}/>}/> */}
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/404' element={<PageNotFound/>}/>
        <Route path='*' element={<Navigate to="/404"/>}/>
      </Routes>
      {location.pathname === '/'|| location.pathname === '/movies'||location.pathname === '/saved-movies'?<Footer/> : null}
      <BurgerMenu 
        isOpen={isBurgerMenuOpen}
        onClose={closeAllPopups}
      />
    </div>
  );

}

export default App;
