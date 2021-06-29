/*
 * Copyright 2021 Marek Kobida
 */
import Route from './Route.js';
class Router {
    #context;
    #routes = [];
    constructor(context = {}) {
        this.#context = context;
    }
    addRoute(route) {
        if (route instanceof Route) {
            route.context = this.#context;
        }
        if (typeof route === 'string') {
            route = new Route(route, this.#context);
        }
        this.#routes.push(route);
        return route;
    }
    set context(context) {
        this.#context = context;
    }
    get routes() {
        return this.#routes;
    }
    test(method, url) {
        for (const route of this.#routes) {
            route.context = this.#context;
            if (route.test(method, url))
                return route;
        }
    }
}
export default Router;
