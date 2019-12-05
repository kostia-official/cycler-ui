import React from 'react';
import { Cycles } from '../Cycles/Cycles';
import { Auth } from '../Auth/Auth';
import { useAuth } from '../../hooks/useAuth';

export const App = () => {
  const { isSavedAccessToken } = useAuth();

  return isSavedAccessToken ? <Cycles /> : <Auth />;
};
