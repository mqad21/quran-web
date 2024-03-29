import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import useGlobalState from './store/useGlobalState';
import Context from './store/context';

const Index = () => {
  const store = useGlobalState();
  return (
    <Context.Provider value={store}>
      <App />
    </Context.Provider>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <Index />
  </React.StrictMode>,
  document.getElementById('root')
);