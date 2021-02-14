/*
 * Copyright 2021 Marek Kobida
 */

import Route from './Route';

class Router<C extends any[]> {
  routes: Route<C, any>[] = [];

  addRoute<P extends Partial<Record<string, string>>>(path: string): Route<C, P> {
    const route = new Route<C, P>(path);

    this.routes.push(route);

    return route;
  }

  async test(context: C, method: string, url: URL | string): Promise<boolean> {
    for (const route of this.routes) {
      if (await route.test(context, method, url)) {
        return true;
      }
    }

    return false;
  }
}

export default Router;
