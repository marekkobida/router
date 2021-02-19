/*
 * Copyright 2021 Marek Kobida
 */

import invariant from '@warden-sk/helpers/invariant';
import urlToRegExp from './urlToRegExp';

interface AfterTest<C extends any[]> {
  (urlParameters: UrlParameters, ...context: C): any;
}

interface UrlParameters {
  [name: string]: string;
}

class Route<C extends any[]> {
  #children: [string, AfterTest<C>][] = [];

  #context?: C;

  #currentUrlParameters: UrlParameters = {};

  #url: [string, RegExp];

  constructor(url: string) {
    this.#url = [url, urlToRegExp(url)];
  }

  addChild(method: string, afterTest: AfterTest<C>): this {
    this.#children.push([method, afterTest]);

    return this;
  }

  assignContext(context: C): this {
    this.#context = context;

    return this;
  }

  set context(context: C) {
    this.#context = context;
  }

  get currentUrlParameters(): UrlParameters {
    return this.#currentUrlParameters;
  }

  delete(afterTest: AfterTest<C>): this {
    this.addChild('DELETE', afterTest);

    return this;
  }

  get(afterTest: AfterTest<C>): this {
    this.addChild('GET', afterTest);

    return this;
  }

  options(afterTest: AfterTest<C>): this {
    this.addChild('OPTIONS', afterTest);

    return this;
  }

  patch(afterTest: AfterTest<C>): this {
    this.addChild('PATCH', afterTest);

    return this;
  }

  post(afterTest: AfterTest<C>): this {
    this.addChild('POST', afterTest);

    return this;
  }

  put(afterTest: AfterTest<C>): this {
    this.addChild('PUT', afterTest);

    return this;
  }

  readUrlParameters(url: string): UrlParameters {
    return url.match(this.#url[1])?.groups || {};
  }

  test(method: string, url: string): boolean {
    invariant(this.#context, 'The context is not assigned.');

    if (this.#url[1].test(url)) {
      for (const child of this.#children) {
        if (child[0] === method) {
          child[1]((this.#currentUrlParameters = this.readUrlParameters(url)), ...this.#context);

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
