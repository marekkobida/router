/*
 * Copyright 2021 Marek Kobida
 */

import Route from './Route';

class Router<Context extends Record<string, any> = {}> {
  #context: Context = {} as Context;

  #currentRoute?: Route<Context>;

  #routes: Route<Context>[] = [];

  addRoute(url: string): Route<Context> {
    const route = new Route<Context>(url);

    this.#routes.push(route);

    return route;
  }

  get context(): Context {
    return this.#context;
  }

  set context(context: Context) {
    this.#context = context;
  }

  get currentRoute(): Route<Context> | undefined {
    return this.#currentRoute;
  }

  get routes(): Route<Context>[] {
    return this.#routes;
  }

  test(method: string, url: string): boolean {
    for (const route of this.#routes) {
      route.context = this.#context;

      if (route.test(method, url)) {
        this.#currentRoute = route;

        return true;
      }
    }

    return false;
  }
}

export default Router;
