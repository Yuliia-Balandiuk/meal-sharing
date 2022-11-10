import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import MealsPage from './components/MealsPage';
import HomePage from './components/HomePage';
import TestComponent from './components/TestComponent/TestComponent';

function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path='/'>
          <HomePage />
        </Route>
        <Route exact path='/meals'>
          <MealsPage />
        </Route>

        <Route exact path='/test-component'>
          <TestComponent></TestComponent>
        </Route>
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
