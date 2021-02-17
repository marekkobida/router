/*
 * Copyright 2021 Marek Kobida
 */

import Route from './Route';

class Router<C extends any[]> {
  #context?: C;

  #routes: Route<C>[] = [];

  addRoute(path: string): Route<C> {
    const route = new Route<C>(path);

    this.#routes.push(route);

    return route;
  }

  assignContext(context: C): this {
    this.#context = context;

    return this;
  }

  test(method: string, url: string): boolean {
    if (this.#context) {
      for (const route of this.#routes) {
        if (route.test(this.#context, method, url)) {
          return true;
        }
      }

      return false;
    }

    throw new Error('The context does not exist.');
  }
}

export default Router;
