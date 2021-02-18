/*
 * Copyright 2021 Marek Kobida
 */

import pathToRegExp from './pathToRegExp';

interface Child<C extends any[]> {
  afterTest: (urlParameters: Partial<Record<string, string>>, ...context: C) => any;
  method: string;
}

class Route<C extends any[]> {
  #children: Child<C>[] = [];

  #context?: C;

  #path: [string, RegExp];

  constructor(path: string) {
    this.#path = [path, pathToRegExp(path)];
  }

  private addChild({ afterTest, method }: Child<C>): this {
    this.#children.push({ afterTest, method });

    return this;
  }

  assignContext(context: C): this {
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

  get path(): [string, RegExp] {
    return this.#path;
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
    return url.match(this.#path[1])?.groups || {};
  }

  test(method: string, url: string): boolean {
    if (this.#context) {
      if (this.#path[1].test(url)) {
        const child = this.readChild(method);

        if (child) {
          const urlParameters = this.readUrlParameters(url);

          child.afterTest(urlParameters, ...this.#context);

          return true;
        }
      }

      return false;
    }

    throw new Error('The context is not assigned.');
  }
}

export default Route;
