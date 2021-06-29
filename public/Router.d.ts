import Route from './Route.js';
declare class Router<C extends Router.Context = {}> {
    #private;
    constructor(context?: C);
    addRoute(route: Route<C> | string): Route<C>;
    set context(context: C);
    get routes(): Route<C>[];
    test(method: string, url: string): Route<C> | undefined;
}
declare namespace Router {
    interface Context extends Record<string, any> {
    }
}
export default Router;
