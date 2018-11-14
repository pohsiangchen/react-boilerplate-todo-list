import Immutable from 'immutable';

export const generateRandomString = () =>
  Math.random()
    .toString(36)
    .substring(2, 15) +
  Math.random()
    .toString(36)
    .substring(2, 15);

export const getRandomInt = (minValue, maxValue) => {
  const min = Math.ceil(minValue);
  const max = Math.floor(maxValue);
  return Math.floor(Math.random() * (max - min)) + min; // The maximum is exclusive and the minimum is inclusive
};

export const toPathname = (...pathnames) => {
  if (pathnames.length < 1) {
    throw new Error('Pathname params with at least one value.');
  }
  let path = '';
  pathnames.forEach(pathname => {
    if (!pathname) {
      throw new Error('Pathname params cannot be null or undefined.');
    }
    // replace all '/' in given pathname
    const sanitizedPathname = pathname.replace(/^\/|\/$/g, '');
    // prevent double '/' e.g. '//teams/123'
    path = path.replace(/\/$/, '');
    path += `/${sanitizedPathname}`;
  });
  return path;
};

/**
 * Transform Immutable object to native object
 * @param  {object} data Immutable/Native object
 */
export const toNativeJS = data =>
  Immutable.Iterable.isIterable(data) ? data.toJS() : data;

/**
 * Checks/Reloads if new web application exists.
 * @param  {string} url The url of web application entry point (e.g. index.html)
 */
export const checkAppVersion = url => {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', url);
  xhr.onload = () => {
    if (xhr.status === 200) {
      // Find string with main.[hash].js pattern
      // in order to prevent match wrong script libs, e.g. xdomain.min.js
      // [hash] length must greater than 3
      const regex = /main\.[a-zA-Z0-9]{4,}\.js/g;
      const bundle = xhr.responseText.match(regex);

      if (!bundle || bundle.length < 1) {
        // Cannot find main.[hash].js
        return;
      }

      if (localStorage.bundle !== bundle[0]) {
        // Newer version exist
        localStorage.setItem('bundle', bundle[0]);
        window.location.reload(true);
      }
    }
  };
  xhr.send();
};
