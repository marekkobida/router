/*
 * Copyright 2021 Marek Kobida
 */

import Route from './Route.js';

class Router<C extends Router.Context = {}> {
  #context: C;

  #routes: Route<C>[] = [];

  constructor(context: C = {} as C) {
    this.#context = context;
  }

  addRoute(route: Route<C> | string): Route<C> {
    if (route instanceof Route) {
      route.context = this.#context;
    }

    if (typeof route === 'string') {
      route = new Route<C>(route, this.#context);
    }

    this.#routes.push(route);

    return route;
  }

  set context(context: C) {
    this.#context = context;
  }

  get routes(): Route<C>[] {
    return this.#routes;
  }

  test(method: string, url: string): Route<C> | undefined {
    for (const route of this.#routes) {
      route.context = this.#context;

      if (route.test(method, url)) return route;
    }
  }
}

namespace Router {
  export interface Context extends Record<string, any> {}
}

export default Router;
