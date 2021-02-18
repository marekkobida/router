/*
 * Copyright 2021 Marek Kobida
 */

import Route from './Route';

class Router<C extends unknown[]> {
  #context?: C;

  #currentRoute?: Route<C>;

  #routes: Route<C>[] = [];

  addRoute(url: string): Route<C> {
    const route = new Route<C>(url);

    this.#routes.push(route);

    return route;
  }

  assignContext(context?: C): this {
    this.#context = context;

    return this;
  }

  get currentRoute(): Route<C> | undefined {
    return this.#currentRoute;
  }

  test(method: string, url: string): boolean {
    for (const route of this.#routes) {
      if (route.assignContext(this.#context).test(method, url)) {
        this.#currentRoute = route;

        return true;
      }
    }

    return false;
  }
}

export default Router;
