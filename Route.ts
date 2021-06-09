/*
 * Copyright 2021 Marek Kobida
 */

import Router from './Router.js';
import urlToRegExp from './urlToRegExp/index.js';

class Route<C extends Router.Context = {}> {
  #children: [method: string, afterTest: Route.AfterTest<C>[]][] = [];

  #context: C;

  readonly #url: [string, RegExp];

  constructor(url: string, context: C = {} as C) {
    this.#context = context;
    this.#url = [url, urlToRegExp(url)];
  }

  addChild(method: string, ...afterTest: Route.AfterTests<C>): this {
    this.#children.push([method, afterTest.flat(Infinity)]);

    return this;
  }

  set context(context: C) {
    this.#context = context;
  }

  delete(...afterTest: Route.AfterTests<C>): this {
    this.addChild('DELETE', ...afterTest);

    return this;
  }

  get(...afterTest: Route.AfterTests<C>): this {
    this.addChild('GET', ...afterTest);

    return this;
  }

  options(...afterTest: Route.AfterTests<C>): this {
    this.addChild('OPTIONS', ...afterTest);

    return this;
  }

  patch(...afterTest: Route.AfterTests<C>): this {
    this.addChild('PATCH', ...afterTest);

    return this;
  }

  post(...afterTest: Route.AfterTests<C>): this {
    this.addChild('POST', ...afterTest);

    return this;
  }

  put(...afterTest: Route.AfterTests<C>): this {
    this.addChild('PUT', ...afterTest);

    return this;
  }

  readUrlParameters(url: string): Route.UrlParameters {
    const [_1, ..._2] = url.match(this.#url[1]) || [];
    return _2;
  }

  #test = (afterTest: Route.AfterTest<C>[], i: number, url: string): this => {
    const next = () => {
      this.#test(afterTest, i + 1, url);
    };

    if (afterTest[i]) {
      const context = {
        ...this.#context,
        urlParameters: this.readUrlParameters(url),
      };

      switch (afterTest[i].length) {
        case 1:
          afterTest[i](context, () => {});
          next();
          break;
        case 2:
          afterTest[i](context, next);
          break;
      }
    }

    return this;
  };

  test(method: string, url: string): this | undefined {
    if (this.#url[1].test(url))
      for (const child of this.#children) if (child[0] === method) return this.#test(child[1], 0, url);
  }

  get url(): [string, RegExp] {
    return this.#url;
  }
}

namespace Route {
  export interface AfterTest<C extends Router.Context = {}> {
    (context: C & { urlParameters: UrlParameters }, next: () => void): void;
  }

  export interface AfterTests<C extends Router.Context = {}> extends Array<AfterTest<C> | AfterTests<C>> {}

  export interface UrlParameters extends Array<string> {}
}

export default Route;
