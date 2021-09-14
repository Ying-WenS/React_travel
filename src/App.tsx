import React, { useEffect } from 'react';
import styles from './App.module.css';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { HomePage, SignInPage, RegisterPage, DetailPage, SearchPage, ShoppingCartPage, PlaceOrderPage } from "./pages";
import { Redirect } from 'react-router';
import { useSelector } from './redux/hook'; //取得jwt數據
import { useDispatch } from 'react-redux';
import { getShoppingCart, checkout } from './redux/shoppingCart/slice';

const PrivateRoute=({component, isAuthenticated, ...rest})=>{
  const routeComponent =(props)=>{
    return isAuthenticated ? (
      React.createElement(component, props)
    ) : (
      <Redirect to={{pathname: "/signIn"}} />
    );
  }
    return <Route render={routeComponent} {...rest} />
};

function App() {
  const jwt = useSelector(state => state.user.token);
  const dispatch = useDispatch();

  useEffect(()=>{
    if(jwt){ 
      dispatch(getShoppingCart(jwt))
    }
  },[jwt]) //jwt有動作時，進入購物車頁面


  return (
    <div className={styles.App}>
      <BrowserRouter>
      <Switch>
      <Route exact path="/" component={HomePage} />
      <Route exact path="/signIn" component={SignInPage} />
      <Route exact path="/register" component={RegisterPage} />
      <Route  path="/detail/:touristRouteId" component={DetailPage} />
      <Route path="/search/:keywords?" component={SearchPage} />
      <PrivateRoute isAuthenticated={jwt !== null} path="/shoppingCart" component={ShoppingCartPage} />
      <PrivateRoute isAuthenticated={jwt !== null} path="/placeOrder" component={PlaceOrderPage} />
      <Route render={()=> <h1>404 not found頁面去火星了！</h1> } />
      </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;