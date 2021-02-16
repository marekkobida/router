/*
 * Copyright 2021 Marek Kobida
 */

import pathToRegExp from './pathToRegExp';

interface Child<C extends readonly any[]> {
  afterTest: (parameters: Partial<Record<string, string>>, ...context: C) => Promise<any>;
  method: string;
}

class Route<C extends readonly any[]> {
  #children: Child<C>[] = [];

  #path: [string, RegExp];

  constructor(path: string) {
    this.#path = [path, pathToRegExp(path)];
  }

  addChild({ afterTest, method }: Child<C>): this {
    this.#children.push({ afterTest, method });

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

  readChild(method: string): Child<C> | undefined {
    return this.#children.find(child => child.method === method);
  }

  readParameters(url: string): Record<string, string> {
    return url.match(this.#path[1])?.groups || {};
  }

  async test(context: C, method: string, url: string): Promise<boolean> {
    if (this.#path[1].test(url)) {
      const child = this.readChild(method);

      if (child) {
        const parameters = this.readParameters(url);

        await child.afterTest(parameters, ...context);

        return true;
      }
    }

    return false;
  }
}

export default Route;
