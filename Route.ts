/*
 * Copyright 2021 Marek Kobida
 */

import pathToRegExp from './pathToRegExp';
import urlSearchParamsToObject from './urlSearchParamsToObject';

interface Parameters<P extends Partial<Record<string, string>>> {
  parameters: P;
  searchParameters: Partial<Record<string, string>>;
}

class Route<C extends any[], P extends Partial<Record<string, string>>> {
  readonly path: RegExp;

  routes: [method: 'GET', _1: (parameters: Parameters<P>, ...context: C) => Promise<void>][] = [];

  constructor(path: string) {
    this.path = pathToRegExp(path);
  }

  get(_1: (parameters: Parameters<P>, ...context: C) => Promise<void>): this {
    this.routes.push(['GET', _1]);

    return this;
  }

  async test(context: C, method: string, url: URL | string): Promise<boolean> {
    if (typeof url === 'string') {
      url = new URL(url, 'file://');
    }

    for (const route of this.routes) {
      if (route[0] === method && this.path.test(url.pathname)) {
        const parameters = url.pathname.match(this.path)?.groups || {};

        const searchParameters = urlSearchParamsToObject(url.searchParams);

        await route[1]({ parameters: parameters as P, searchParameters }, ...context);

        return true;
      }
    }

    return false;
  }
}

export default Route;
