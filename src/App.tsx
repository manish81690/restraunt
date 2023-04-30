import React, { useState } from 'react';
import Dashboard from './components/dashboard';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './components/login';
import { Provider } from 'react-redux';
import { store } from './store/homePageSlice';



function App() {
  const [user, setUser] = useState(null);
  return (
    <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route  path="/*" element={<div>
      {user ? (
        <Dashboard/>
      ) : (
        <Login setUser={setUser} />
      )}
    </div>} />
      </Routes>
    </BrowserRouter>
    </Provider>
  );
}

export default App;
