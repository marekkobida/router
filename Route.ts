/*
 * Copyright 2021 Marek Kobida
 */

import pathToRegExp from './pathToRegExp';

class Route<Context extends any[], Parameters extends Partial<Record<string, string>>> {
  #path: RegExp;

  #routes: [method: string, _1: (parameters: Parameters, ...context: Context) => Promise<void>][] = [];

  constructor(path: string) {
    this.#path = pathToRegExp(path);
  }

  delete(_1: (parameters: Parameters, ...context: Context) => Promise<void>): this {
    this.#routes.push(['DELETE', _1]);

    return this;
  }

  get(_1: (parameters: Parameters, ...context: Context) => Promise<void>): this {
    this.#routes.push(['GET', _1]);

    return this;
  }

  patch(_1: (parameters: Parameters, ...context: Context) => Promise<void>): this {
    this.#routes.push(['PATCH', _1]);

    return this;
  }

  post(_1: (parameters: Parameters, ...context: Context) => Promise<void>): this {
    this.#routes.push(['POST', _1]);

    return this;
  }

  put(_1: (parameters: Parameters, ...context: Context) => Promise<void>): this {
    this.#routes.push(['PUT', _1]);

    return this;
  }

  async test(context: Context, method: string, url: URL | string): Promise<boolean> {
    if (typeof url === 'string') {
      url = new URL(url, 'file://');
    }

    for (const route of this.#routes) {
      if (route[0] === method && this.#path.test(url.pathname)) {
        const parameters = url.pathname.match(this.#path)?.groups || {};

        await route[1](parameters as Parameters, ...context);

        return true;
      }
    }

    return false;
  }
}

export default Route;
