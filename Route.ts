/*
 * Copyright 2021 Marek Kobida
 */

import urlToRegExp from './urlToRegExp';

interface UrlParameters extends Partial<Record<string, string>> {}

interface AfterTest<Context extends Record<string, any> = {}> {
  (urlParameters: UrlParameters, context: Context): any;
}

class Route<Context extends Record<string, any> = {}> {
  #children: [method: string, afterTest: AfterTest<Context>][] = [];

  #context: Context = {} as Context;

  readonly #url: [string, RegExp];

  constructor(url: string) {
    this.#url = [url, urlToRegExp(url)];
  }

  addChild(method: string, afterTest: AfterTest<Context>): this {
    this.#children.push([method, afterTest]);

    return this;
  }

  set context(context: Context) {
    this.#context = context;
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

  test(method: string, url: string): this | undefined {
    if (this.#url[1].test(url)) {
      for (const child of this.#children) {
        if (child[0] === method) {
          child[1](this.readUrlParameters(url), this.#context);

          return this;
        }
      }
    }
  }

  get url(): [string, RegExp] {
    return this.#url;
  }
}

export default Route;
