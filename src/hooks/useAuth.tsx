import { config } from '../config';
import { useAuth as useAuth0 } from 'use-auth0-hooks';
import { UseAuthResult } from 'use-auth0-hooks/dist/hooks/use-auth';

interface IUseAuthResult extends UseAuthResult {
  isSavedAccessToken: boolean;
}

export const useAuth = (): IUseAuthResult => {
  const auth = useAuth0();
  const { accessToken } = useAuth0(config.auth);

  if (accessToken) {
    localStorage.setItem('token', accessToken);
  }
  const savedAccessToked = localStorage.getItem('token');

  return { ...auth, accessToken, isSavedAccessToken: !!savedAccessToked };
};
