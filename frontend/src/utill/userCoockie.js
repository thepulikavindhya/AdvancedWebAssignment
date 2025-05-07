import Cookies from 'js-cookie';

export const setUserDataInCookies = (userData) => {
  Cookies.set('userData', JSON.stringify(userData), { expires: 10 / 1440 }); // Expires in 10 minutes
};

export const removeUserDataFromCookies = () => {
  Cookies.remove('userData');
};

export const getUserDataFromCookies = () => {
  const userData = Cookies.get('userData');
  return userData ? JSON.parse(userData) : null;
};