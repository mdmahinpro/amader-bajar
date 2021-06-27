import { createContext, useState } from "react";
import {
  BrowserRouter as Router, Route, Switch
} from "react-router-dom";
import PrivateRoute from '../src/components/PrivateRoute/PrivateRoute';
import './App.css';
import Header from './components/Header/Header';
import Inventory from "./components/Inventory/Inventory";
import Login from "./components/Login/Login";
import NotMatch from "./components/NotMatch/NotMatch";
import ProductDetails from './components/ProductDetails/ProductDetails';
import Review from "./components/Review/Review";
import Shipment from "./components/Shipment/Shipment";
import Shop from './components/Shop/Shop';
export const UserContext=createContext()


function App() {
  const [loggedInUser, setLoggedInUser] = useState({})


  return (
    <UserContext.Provider value={[loggedInUser,setLoggedInUser]}>
      
    <Router>
       <h1>Email:{loggedInUser.email}</h1>
       <Header></Header>
    <Switch>
      <Route exact path="/">
        <Shop></Shop>
      </Route>
      <Route path="/home">
        <Shop></Shop>
      </Route> 
      <Route path="/product/:key">
        <ProductDetails></ProductDetails>
      </Route>
      <Route path="/review">
        <Review></Review>
      </Route>
      <Route path="/inventory">
        <Inventory></Inventory>
      </Route>
      <Route path='/login'>
        <Login></Login>
      </Route>
      <PrivateRoute path='/shipment'>
        <Shipment></Shipment>
      </PrivateRoute>
      <Route path="*">
        <NotMatch></NotMatch>
      </Route>
    </Switch>
    </Router>
    </UserContext.Provider>
  );
}

export default App;
