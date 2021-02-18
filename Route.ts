/*
 * Copyright 2021 Marek Kobida
 */

import invariant from './invariant';
import urlToRegExp from './urlToRegExp';

interface Child<C extends any[]> {
  afterTest: (urlParameters: Partial<Record<string, string>>, ...context: C) => any;
  method: string;
}

class Route<C extends any[]> {
  #children: Child<C>[] = [];

  #context?: C;

  #currentUrlParameters: Partial<Record<string, string>> = {};

  #url: [string, RegExp];

  constructor(url: string) {
    this.#url = [url, urlToRegExp(url)];
  }

  addChild({ afterTest, method }: Child<C>): this {
    this.#children.push({ afterTest, method });

    return this;
  }

  assignContext(context: C): this {
    this.#context = context;

    return this;
  }

  get currentUrlParameters(): Partial<Record<string, string>> {
    return this.#currentUrlParameters;
  }

  delete(afterTest: Child<C>['afterTest']): this {
    this.addChild({ afterTest, method: 'DELETE' });

    return this;
  }

  get(afterTest: Child<C>['afterTest']): this {
    this.addChild({ afterTest, method: 'GET' });

    return this;
  }

  options(afterTest: Child<C>['afterTest']): this {
    this.addChild({ afterTest, method: 'OPTIONS' });

    return this;
  }

  patch(afterTest: Child<C>['afterTest']): this {
    this.addChild({ afterTest, method: 'PATCH' });

    return this;
  }

  post(afterTest: Child<C>['afterTest']): this {
    this.addChild({ afterTest, method: 'POST' });

    return this;
  }

  put(afterTest: Child<C>['afterTest']): this {
    this.addChild({ afterTest, method: 'PUT' });

    return this;
  }

  readUrlParameters(url: string): Partial<Record<string, string>> {
    return url.match(this.#url[1])?.groups || {};
  }

  test(method: string, url: string): boolean {
    invariant(this.#context, 'The context is not assigned.');

    if (this.#url[1].test(url)) {
      for (const child of this.#children) {
        if (child.method === method) {
          child.afterTest((this.#currentUrlParameters = this.readUrlParameters(url)), ...this.#context);

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
