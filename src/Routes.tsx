import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Cycles } from './components/Cycles/Cycles';
import { CycleForm } from './components/CycleForm/CycleForm';
import { Iterations } from './components/Iterations/Iterations';

export const Routes = () => {
  return (
    <Switch>
      <Route exact path="/">
        <Cycles />
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
