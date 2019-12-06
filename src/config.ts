export const config = {
  auth: {
    domain: 'kozzztya.auth0.com',
    clientId: process.env.REACT_APP_AUTH0_CLIENT_ID as string,
    redirectUri: process.env.REACT_APP_AUTH0_REDIRECT_URI as string,
    responseType: 'token id_token',
    scope: 'openid',
    audience: 'cycler-api'
  },
  apiUrl: process.env.REACT_APP_API_URL as string
};
