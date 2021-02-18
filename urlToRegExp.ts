/*
 * Copyright 2021 Marek Kobida
 */

function urlToRegExp(url: string): RegExp {
  // from "/" to "\/"
  url = url.replace(/\//, '\\/');

  // from "\/:id" to "(?:\/(?<id>[^\/]+))"
  url = url.replace(/\/:([^\/]+)/g, (..._1) => '(?:\\/(?<' + _1[1] + '>[^\\/]+))');

  url = '^' + url + '\\/?' + '$';

  return new RegExp(url);
}

export default urlToRegExp;
