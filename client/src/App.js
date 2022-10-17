import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { Landing } from './Components/Landing/Landing';
import { Home } from './Components/Home/Home';
import { NewActivity } from './Components/newActivity/newActivity';
import { DetailCountry } from './Components/detailCountry/detailCountry';
import { NotFound } from './Components/NotFound/NotFound';
import { Activities } from './Components/Activities/Activities';
import { About } from './Components/About/About';

import './App.css';

export default function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route
          exact
          path='/'
          component={Landing}
        />
        <Route
          exact
          path='/home'
          component={Home}
        />
        <Route
          exact
          path='/create'
          component={NewActivity}
        />
        <Route
          exact
          path='/countries/:id'
          component={DetailCountry}
        />
        <Route
          path='/error'
          component={NotFound}
        />
        <Route
          exact
          path='/activities'
          component={Activities}
        />
        <Route
          exact
          path='/about'
          component={About}
        />
        <Redirect
          from='*'
          to='/error'
        />
      </Switch>
    </BrowserRouter>
  );
}
