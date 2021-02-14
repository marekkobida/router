/*
 * Copyright 2021 Marek Kobida
 */

import pathToRegExp from './pathToRegExp';

class Route<C extends any[], P extends Partial<Record<string, string>>> {
  children: [method: string, _1: (parameters: P, ...context: C) => Promise<void>][] = [];

  path: RegExp;

  constructor(path: string) {
    this.path = pathToRegExp(path);
  }

  addChild(method: string, _1: this['children'][number][1]): this {
    this.children.push([method, _1]);

    return this;
  }

  delete(_1: this['children'][number][1]): this {
    this.addChild('DELETE', _1);

    return this;
  }

  get(_1: this['children'][number][1]): this {
    this.addChild('GET', _1);

    return this;
  }

  patch(_1: this['children'][number][1]): this {
    this.addChild('PATCH', _1);

    return this;
  }

  post(_1: this['children'][number][1]): this {
    this.addChild('POST', _1);

    return this;
  }

  put(_1: this['children'][number][1]): this {
    this.addChild('PUT', _1);

    return this;
  }

  async test(context: C, method: string, url: URL | string): Promise<boolean> {
    if (typeof url === 'string') {
      url = new URL(url, 'file://');
    }

    if (this.path.test(url.pathname)) {
      for (const child of this.children) {
        if (child[0] === method) {
          const parameters = url.pathname.match(this.path)?.groups || {};

          await child[1](parameters as P, ...context);

          return true;
        }
      }
    }

    return false;
  }
}

export default Route;
