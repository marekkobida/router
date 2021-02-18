/*
 * Copyright 2021 Marek Kobida
 */

import Route from './Route';

class Router<C extends unknown[]> {
  #context?: C;

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

  test(method: string, url: string): Route<C> | undefined {
    return this.#routes.find(route => route.assignContext(this.#context).test(method, url));
  }
}

export default Router;
