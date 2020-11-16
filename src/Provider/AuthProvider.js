import Cookies from 'universal-cookie';

export const logout = () => {
  const cookies = new Cookies();

  return new Promise((resolve, reject) => {
    cookies.remove('payload', { path: '/', domain: '127.0.0.1' });
    cookies.remove('XSRF-TOKEN', { path: '/', domain: '127.0.0.1' });
    cookies.remove('_csrf', { path: '/', domain: '127.0.0.1' });
    resolve();
  });
};
