/*
 * Copyright 2021 Marek Kobida
 */

import pathToRegExp from './pathToRegExp';

interface Child<C extends any[], P extends Partial<Record<string, string>>> {
  _1: (parameters: P, ...context: C) => Promise<void>;
  method: string;
}

class Route<C extends any[], P extends Partial<Record<string, string>>> {
  #children: Child<C, P>[] = [];

  #name?: string;

  #paths: [string, RegExp];

  constructor(path: string) {
    this.#paths = [path, pathToRegExp(path)];
  }

  addChild(_1: Child<C, P>['_1'], method: string): this {
    this.#children.push({ _1, method });

    return this;
  }

  assignName(name: string): this {
    this.#name = name;

    return this;
  }

  delete(_1: Child<C, P>['_1']): this {
    this.addChild(_1, 'DELETE');

    return this;
  }

  get(_1: Child<C, P>['_1']): this {
    this.addChild(_1, 'GET');

    return this;
  }

  patch(_1: Child<C, P>['_1']): this {
    this.addChild(_1, 'PATCH');

    return this;
  }

  post(_1: Child<C, P>['_1']): this {
    this.addChild(_1, 'POST');

    return this;
  }

  put(_1: Child<C, P>['_1']): this {
    this.addChild(_1, 'PUT');

    return this;
  }

  async test(context: C, method: string, url: URL | string): Promise<boolean> {
    if (typeof url === 'string') {
      url = new URL(url, 'file://');
    }

    if (this.#paths[1].test(url.pathname)) {
      for (const child of this.#children) {
        if (child.method === method) {
          const parameters = url.pathname.match(this.#paths[1])?.groups || {};

          await child._1(parameters as P, ...context);

          return true;
        }
      }
    }

    return false;
  }

  toJSON() {
    return {
      children: this.#children.map(child => child.method),
      name: this.#name,
      paths: this.#paths.map(path => path.toString()),
    };
  }
}

export default Route;
