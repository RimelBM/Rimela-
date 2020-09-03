import React from 'react';
import {BrowserRouter , Switch , Route } from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.min.css' ;
import Home from "./pages/home/Home"
import Login from "./pages/auth/Login"
import Register from "./pages/auth/Register"
import Navbar from "./components/Navbar"
//import  "./App.css"
import store from "./store"
import {Provider} from 'react-redux'
function App() {
  return (
    <Provider store ={store} >
    <div className='App'>

      <Navbar/>
   
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
        </Switch>
      </BrowserRouter>
    </div>
    </Provider>
  );
}

export default App;
