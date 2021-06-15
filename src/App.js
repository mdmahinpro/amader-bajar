import {
  BrowserRouter as Router, Route, Switch
} from "react-router-dom";
import './App.css';
import Header from './components/Header/Header';
import NotMatch from "./components/NotMatch/NotMatch";
import ProductDetails from './components/ProductDetails/ProductDetails';
import Review from "./components/Review/Review";
import Shop from './components/Shop/Shop';

function App() {
  
  return (
    <Router>
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
      <Route path="*">
        <NotMatch></NotMatch>
      </Route>
    </Switch>
    </Router>
  );
}

export default App;
