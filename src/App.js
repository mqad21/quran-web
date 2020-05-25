import React from 'react';
import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/js/materialize.min.js';
import './App.css';
import Main from "./components/MainComp";
import { HashRouter } from 'react-router-dom'


function App() {
  return (
    <HashRouter>
      <Main />
    </HashRouter>
  );
}

export default App;
