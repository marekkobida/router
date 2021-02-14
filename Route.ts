/*
 * Copyright 2021 Marek Kobida
 */

import pathToRegExp from './pathToRegExp';

class Route<C extends any[], P extends Partial<Record<string, string>>> {
  path: RegExp;

  routes: [method: string, _1: (parameters: P, ...context: C) => Promise<void>][] = [];

  constructor(path: string) {
    this.path = pathToRegExp(path);
  }

  addRoute(method: string, _1: this['routes'][number][1]): this {
    this.routes.push([method, _1]);

    return this;
  }

  delete(_1: this['routes'][number][1]): this {
    this.addRoute('DELETE', _1);

    return this;
  }

  get(_1: this['routes'][number][1]): this {
    this.addRoute('GET', _1);

    return this;
  }

  patch(_1: this['routes'][number][1]): this {
    this.addRoute('PATCH', _1);

    return this;
  }

  post(_1: this['routes'][number][1]): this {
    this.addRoute('POST', _1);

    return this;
  }

  put(_1: this['routes'][number][1]): this {
    this.addRoute('PUT', _1);

    return this;
  }

  async test(context: C, method: string, url: URL | string): Promise<boolean> {
    if (typeof url === 'string') {
      url = new URL(url, 'file://');
    }

    for (const [_1, _2] of this.routes) {
      if (_1 === method && this.path.test(url.pathname)) {
        const parameters = url.pathname.match(this.path)?.groups || {};

        await _2(parameters as P, ...context);

        return true;
      }
    }

    return false;
  }
}

export default Route;
