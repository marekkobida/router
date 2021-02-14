/*
 * Copyright 2021 Marek Kobida
 */

function pathToRegExp(path: string): RegExp {
  // from "/" to "\/"
  path = path.replace(/\//, '\\/');

  // from "\/:id" to "(?:\/(?<id>[^\/]+))"
  path = path.replace(/\/:([^\/]+)/g, (..._1) => '(?:\\/(?<' + _1[1] + '>[^\\/]+))');

  path = '^' + path + '\\/?' + '$';

  return new RegExp(path);
}

export default pathToRegExp;
