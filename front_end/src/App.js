import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";

import PrivateRoute from "./components/common/PrivateRoute";

import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import { clearCurrentProfile } from "./actions/profileActions";

import NavBar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Landing from "./components/landing_page/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Search from "./components/layout/Search";
import Dashboard from "./components/dashboard/Dashboard";
import CreateProfile from "./components/create-profile/CreateProfile";
import EditProfile from "./components/edit-profile/EditProfile";
import NotFound from "./components/layout/NotFound";
import searchResultOverview from "./components/searchResultOverview/searchResultOverview";
import Confirmation from "./components/booking/Confirmation";
// trying individual page
import IndivHotel from "./components/indiv-hotel/IndivHotel";
import HistoryOverview from "./components/history/HistoryOverview";
import HistorySingleOrder from "./components/history/HistorySingleOrder";
import AboutUs from "./components/about_page/AboutUs";
import PaymentPage from "./components/payment/PaymentPage";
import { Elements, StripeProvider } from "react-stripe-elements";
import "./App.css";

// check for token
if (localStorage.jwtToken) {
  // set auth token header auth
  setAuthToken(localStorage.jwtToken);
  // decode token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken);
  // set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  // Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Clear current Profile
    store.dispatch(clearCurrentProfile());
    // Redirect to login
    window.location.href = "/login";
  }
}

// We have to wrap PrivateRoutes in a Switch to prevent redirection issues
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <NavBar />
            <Route exact path="/" component={Landing} />
            <Route exact path="/Search" component={Search} />
            <Route
              exact
              path="/searchResultOverview"
              component={searchResultOverview}
            />
            <StripeProvider apiKey='pk_test_CfoXbulxsXkVcOxKjywJuhkq00V32mVcsx'>
              <Elements>
                <Route exact path="/payment" component={PaymentPage} />
              </Elements>
            </StripeProvider>
            <Route exact path="/confirmation" component={Confirmation} />
            <Route exact path="/aboutus" component={AboutUs} />

            <div className="container">
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/indiv-hotel" component={IndivHotel} />
              <Route exact path="/not-found/:attempt" component={NotFound} />
              <Switch>
                <PrivateRoute exact path="/dashboard" component={Dashboard} />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/history"
                  component={HistoryOverview}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/history/:order"
                  component={HistorySingleOrder}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/create-profile"
                  component={CreateProfile}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/edit-profile"
                  component={EditProfile}
                />
              </Switch>
            </div>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
