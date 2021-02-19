/*
 * Copyright 2021 Marek Kobida
 */

import Route from './Route';
import invariant from '@warden-sk/helpers/invariant';

class Router<C extends any[]> {
  #context?: C;

  #currentRoute?: Route<C>;

  #routes: Route<C>[] = [];

  addRoute(url: string): Route<C> {
    const route = new Route<C>(url);

    this.#routes.push(route);

    return route;
  }

  assignContext(context: C): this {
    this.#context = context;

    return this;
  }

  set context(context: C) {
    this.#context = context;
  }

  get currentRoute(): Route<C> | undefined {
    return this.#currentRoute;
  }

  get routes(): Route<C>[] {
    return this.#routes;
  }

  test(method: string, url: string): boolean {
    invariant(this.#context, 'The context is not assigned.');

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
