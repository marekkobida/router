/*
 * Copyright 2021 Marek Kobida
 */

import Route from './Route';

class Router<Context extends any[]> {
  #routes: Route<Context, any>[] = [];

  addRoute<Parameters extends Partial<Record<string, string>>>(path: string): Route<Context, Parameters> {
    const route = new Route<Context, Parameters>(path);

    this.#routes.push(route);

    return route;
  }

  async test(context: Context, method: string, url: string): Promise<boolean> {
    for (const route of this.#routes) {
      if (await route.test(context, method, url)) {
        return true;
      }
    }

    return false;
  }
}

export default Router;
