/*
 * Copyright 2021 Marek Kobida
 */

import Route from './Route';

class Router<C extends readonly any[]> {
  #routes: Route<C>[] = [];

  addRoute(path: string): Route<C> {
    const route = new Route<C>(path);

    this.#routes.push(route);

    return route;
  }

  async test(context: C, method: string, url: string): Promise<any> {
    for (const route of this.#routes) {
      const test = await route.test(context, method, url);

      if (test) {
        return test;
      }
    }
  }
}

export default Router;
