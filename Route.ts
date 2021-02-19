/*
 * Copyright 2021 Marek Kobida
 */

import urlToRegExp from './urlToRegExp';

interface UrlParameters extends Record<string, any> {}

interface AfterTest<Context extends Record<string, any> = {}> {
  (urlParameters: UrlParameters, context: Context): any;
}

class Route<Context extends Record<string, any> = {}> {
  #children: [method: string, afterTest: AfterTest<Context>][] = [];

  #context: Context = {} as Context;

  #currentUrlParameters: UrlParameters = {};

  readonly #url: [string, RegExp];

  constructor(url: string) {
    this.#url = [url, urlToRegExp(url)];
  }

  addChild(method: string, afterTest: AfterTest<Context>): this {
    this.#children.push([method, afterTest]);

    return this;
  }

  get context(): Context {
    return this.#context;
  }

  set context(context: Context) {
    this.#context = context;
  }

  get currentUrlParameters(): UrlParameters {
    return this.#currentUrlParameters;
  }

  delete(afterTest: AfterTest<Context>): this {
    this.addChild('DELETE', afterTest);

    return this;
  }

  get(afterTest: AfterTest<Context>): this {
    this.addChild('GET', afterTest);

    return this;
  }

  options(afterTest: AfterTest<Context>): this {
    this.addChild('OPTIONS', afterTest);

    return this;
  }

  patch(afterTest: AfterTest<Context>): this {
    this.addChild('PATCH', afterTest);

    return this;
  }

  post(afterTest: AfterTest<Context>): this {
    this.addChild('POST', afterTest);

    return this;
  }

  put(afterTest: AfterTest<Context>): this {
    this.addChild('PUT', afterTest);

    return this;
  }

  readUrlParameters(url: string): UrlParameters {
    return url.match(this.#url[1])?.groups || {};
  }

  test(method: string, url: string): boolean {
    if (this.#url[1].test(url)) {
      for (const child of this.#children) {
        if (child[0] === method) {
          child[1]((this.#currentUrlParameters = this.readUrlParameters(url)), this.#context);

          return true;
        }
      }
    }

    return false;
  }

  get url(): [string, RegExp] {
    return this.#url;
  }
}

export default Route;
