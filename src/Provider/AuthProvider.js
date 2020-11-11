import Cookies from 'universal-cookie';

export const logout = () => {
  return new Promise((resolve, reject) => {
    const cookies = new Cookies();
    cookies.remove('payload');
    cookies.remove('XSRF-TOKEN');
    cookies.remove('_csrf');
    resolve();
  });
};
