declare class Route<Context extends any[], Parameters extends Partial<Record<string, string>>> {
    #private;
    constructor(path: string);
    addRoute(method: string, _1: (parameters: Parameters, ...context: Context) => Promise<void>): this;
    delete(_1: (parameters: Parameters, ...context: Context) => Promise<void>): this;
    get(_1: (parameters: Parameters, ...context: Context) => Promise<void>): this;
    patch(_1: (parameters: Parameters, ...context: Context) => Promise<void>): this;
    post(_1: (parameters: Parameters, ...context: Context) => Promise<void>): this;
    put(_1: (parameters: Parameters, ...context: Context) => Promise<void>): this;
    test(context: Context, method: string, url: URL | string): Promise<boolean>;
}
export default Route;
