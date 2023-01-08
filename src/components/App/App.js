import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';
import NoPage from '../NoPage/NoPage';
import './App.css';

function App() {
  return (
    <div className='app'>
        <Header/>
        <Routes>
          <Route path='/signup' element={<Register/>}/>
          <Route path='/signin' element={<Login/>}/>
          <Route path='/' element={
            <>
              <Main/>
              <Footer/>
            </>
          }/>
          <Route path='/movies' element={
            <>
              <Movies/>
              <Footer/>
            </>
          }/>
          <Route path='/saved-movies' element={
          <>
            <SavedMovies/>
            <Footer/>
          </>
          }/>
          <Route path='/profile' element={<Profile/>}/>
          <Route path='/*' element={<NoPage/>}/>
        </Routes>
        
    </div>
  );
}

export default App;
