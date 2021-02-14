declare class Route<C extends any[], P extends Partial<Record<string, string>>> {
    path: RegExp;
    routes: [method: string, _1: (parameters: P, ...context: C) => Promise<void>][];
    constructor(path: string);
    addRoute(method: string, _1: this['routes'][number][1]): this;
    delete(_1: this['routes'][number][1]): this;
    get(_1: this['routes'][number][1]): this;
    patch(_1: this['routes'][number][1]): this;
    post(_1: this['routes'][number][1]): this;
    put(_1: this['routes'][number][1]): this;
    test(context: C, method: string, url: URL | string): Promise<boolean>;
}
export default Route;
