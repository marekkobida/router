import Router from './Router.js';
declare class Route<C extends Router.Context = {}> {
    #private;
    constructor(url: string, context?: C);
    addChild(method: string, ...afterTest: Route.AfterTests<C>): this;
    set context(context: C);
    delete(...afterTest: Route.AfterTests<C>): this;
    get(...afterTest: Route.AfterTests<C>): this;
    options(...afterTest: Route.AfterTests<C>): this;
    patch(...afterTest: Route.AfterTests<C>): this;
    post(...afterTest: Route.AfterTests<C>): this;
    put(...afterTest: Route.AfterTests<C>): this;
    readUrlParameters(url: string): Route.UrlParameters;
    test(method: string, url: string): this | undefined;
    get url(): [string, RegExp];
}
declare namespace Route {
    interface AfterTest<C extends Router.Context = {}> {
        (context: C & {
            urlParameters: UrlParameters;
        }, next: () => void): void;
    }
    interface AfterTests<C extends Router.Context = {}> extends Array<AfterTest<C> | AfterTests<C>> {
    }
    interface UrlParameters extends Array<string> {
    }
}
export default Route;
