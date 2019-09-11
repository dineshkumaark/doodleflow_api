import React from 'react';
import Routes from './Routes';
import { Provider } from 'react-redux';
import store from './store';
import './assets/css/App.css';

function App() {
  return (
      <Provider store={store}>
        <div className="App">
            <Routes />
        </div>
      </Provider>
  );
}

export default App;
