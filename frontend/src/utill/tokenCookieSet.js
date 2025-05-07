import Cookies from 'js-cookie';

export const setTokenInCookies = (token) => {
  Cookies.set('authToken', token, { expires: 10/ 1440  }); // Expires in 10minutes
};


export const removeTokenFromCookies = () => {
  Cookies.remove('authToken');
};

export const getTokenFromCookies = () => {
  return Cookies.get('authToken');
};

