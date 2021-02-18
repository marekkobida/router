/*
 * Copyright 2021 Marek Kobida
 */

import urlToRegExp from './urlToRegExp';

interface Child<C extends any[]> {
  afterTest: (urlParameters: Partial<Record<string, string>>, ...context: C) => any;
  method: string;
}

class Route<C extends any[]> {
  #children: Child<C>[] = [];

  #context?: C;

  #url: [string, RegExp];

  constructor(url: string) {
    this.#url = [url, urlToRegExp(url)];
  }

  private addChild({ afterTest, method }: Child<C>): this {
    this.#children.push({ afterTest, method });

    return this;
  }

  assignContext(context?: C): this {
    this.#context = context;

    return this;
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

  private readChild(method: string): Child<C> | undefined {
    return this.#children.find(child => child.method === method);
  }

  private readUrlParameters(url: string): Partial<Record<string, string>> {
    return url.match(this.#url[1])?.groups || {};
  }

  test(method: string, url: string): this | undefined {
    if (this.#context) {
      if (this.#url[1].test(url)) {
        const child = this.readChild(method);

        if (child) {
          const urlParameters = this.readUrlParameters(url);

          child.afterTest(urlParameters, ...this.#context);

          return this;
        }
      }

      return;
    }

    throw new Error('The context is not assigned.');
  }

  get url(): [string, RegExp] {
    return this.#url;
  }
}

export default Route;
