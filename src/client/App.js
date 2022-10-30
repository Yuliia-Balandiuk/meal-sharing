import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import MealsPage from './components/MealsPage';
import TestComponent from './components/TestComponent/TestComponent';

function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path='/'>
          <MealsPage />
        </Route>
        <Route exact path='/lol'>
          <p>lol</p>
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
