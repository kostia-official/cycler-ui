import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { App } from './components/App/App';
import { CycleForm } from './components/CycleForm/CycleForm';
import { Iterations } from './components/Iterations/Iterations';
import { Auth } from './components/Auth/Auth';

export const Routes = () => {
  return (
    <Switch>
      <Route exact path="/">
        <App />
      </Route>
      <Route exact path="/auth">
        <Auth />
      </Route>
      <Route path="/cycle/create">
        <CycleForm />
      </Route>
      <Route path="/cycle/edit/:cycleId">
        <CycleForm />
      </Route>
      <Route path="/iterations/:cycleId">
        <Iterations />
      </Route>
    </Switch>
  );
};
