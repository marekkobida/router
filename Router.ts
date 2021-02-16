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

  test(context: C, method: string, url: string): boolean {
    for (const route of this.#routes) {
      if (route.test(context, method, url)) {
        return true;
      }
    }

    return false;
  }
}

export default Router;
