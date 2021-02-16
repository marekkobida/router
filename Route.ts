/*
 * Copyright 2021 Marek Kobida
 */

import pathToRegExp from './pathToRegExp';

interface Child<C extends readonly any[]> {
  _1: (parameters: Partial<Record<string, string>>, ...context: C) => Promise<any>;
  method: string;
}

class Route<C extends readonly any[]> {
  #children: Child<C>[] = [];

  #paths: [string, RegExp];

  constructor(path: string) {
    this.#paths = [path, pathToRegExp(path)];
  }

  addChild({ _1, method }: Child<C>): this {
    this.#children.push({ _1, method });

    return this;
  }

  delete(_1: Child<C>['_1']): this {
    this.addChild({ _1, method: 'DELETE' });

    return this;
  }

  get(_1: Child<C>['_1']): this {
    this.addChild({ _1, method: 'GET' });

    return this;
  }

  options(_1: Child<C>['_1']): this {
    this.addChild({ _1, method: 'OPTIONS' });

    return this;
  }

  patch(_1: Child<C>['_1']): this {
    this.addChild({ _1, method: 'PATCH' });

    return this;
  }

  post(_1: Child<C>['_1']): this {
    this.addChild({ _1, method: 'POST' });

    return this;
  }

  put(_1: Child<C>['_1']): this {
    this.addChild({ _1, method: 'PUT' });

    return this;
  }

  async test(context: C, method: string, url: string): Promise<any> {
    if (this.#paths[1].test(url)) {
      for (const child of this.#children) {
        if (child.method === method) {
          const parameters = url.match(this.#paths[1])?.groups || {};

          return await child._1(parameters, ...context);
        }
      }
    }
  }
}

export default Route;
