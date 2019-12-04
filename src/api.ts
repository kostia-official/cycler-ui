import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://ewc3w4owo3.execute-api.eu-west-1.amazonaws.com/prod',
  timeout: 5000
});
