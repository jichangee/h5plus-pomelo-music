const Token = 'Pomelo-Auth-Token';
const Login = 'Pomelo-Login';

export const getToken = () => window.localStorage.getItem(Token);

export const setToken = (token) => {
  window.localStorage.setItem(Token, token);
}

export const isLogin = () => window.localStorage.getItem(Login) === 'true'
export const setLogin = () => {
  window.localStorage.setItem(Login, 'true');
}

export const clearAuth = () => {
  window.localStorage.clear();
}