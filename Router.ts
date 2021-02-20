/*
 * Copyright 2021 Marek Kobida
 */

import Route from './Route';

class Router<Context extends Record<string, any> = {}> {
  #context: Context = {} as Context;

  #routes: Route<Context>[] = [];

  addRoute(url: string): Route<Context> {
    const route = new Route<Context>(url);

    this.#routes.push(route);

    return route;
  }

  set context(context: Context) {
    this.#context = context;
  }

  get routes(): Route<Context>[] {
    return this.#routes;
  }

  test(method: string, url: string): Route<Context> | undefined {
    for (const route of this.#routes) {
      route.context = this.#context;

      if (route.test(method, url)) {
        return route;
      }
    }
  }
}

export default Router;
