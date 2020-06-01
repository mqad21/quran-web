import React, { useContext } from 'react';
import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/js/materialize.min.js';
import './App.css';
import Main from "./components/MainComp";
import { HashRouter } from 'react-router-dom';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Context from './store/context';

function App() {

  const { state } = useContext(Context);

  const theme = createMuiTheme({
    palette: {
      type: state.darkMode ? 'dark' : 'light',
      primary: {
        main: '#03f74a'
      },
      white: '#fffff',
      secondary: {
        main: '#0fc7d5'
      },
      grey: {
        main: '#efefef'
      }
    }
  });

  return (
    <HashRouter>
      <ThemeProvider theme={theme}>
        <Main />
      </ThemeProvider>
    </HashRouter>
  );
}

export default App;
