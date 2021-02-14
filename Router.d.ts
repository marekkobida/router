import Route from './Route';
declare class Router<C extends any[]> {
    routes: Route<C, any>[];
    addRoute<P extends Partial<Record<string, string>>>(path: string): Route<C, P>;
    test(context: C, method: string, url: URL | string): Promise<boolean>;
}
export default Router;
