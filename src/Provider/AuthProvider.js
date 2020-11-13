import Cookies from 'universal-cookie';

export const logout = () => {
  const cookies = new Cookies();

  return new Promise((resolve, reject) => {
    cookies.remove('payload');
    cookies.remove('XSRF-TOKEN');
    cookies.remove('_csrf');
    resolve();
  });
};
