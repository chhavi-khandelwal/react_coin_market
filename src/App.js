import React from 'react';
import './App.scss';
import { Provider } from "react-redux";
import store from "./redux/store";
import Dashboard from './components/Dashboard';

function App() {
  return (
    <Provider store={ store }>
      <Dashboard></Dashboard>
    </Provider>
  );
}

export default App;
