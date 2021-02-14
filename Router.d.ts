import Route from './Route';
declare class Router<Context extends any[]> {
    #private;
    addRoute<Parameters extends Partial<Record<string, string>>>(path: string): Route<Context, Parameters>;
    test(context: Context, method: string, url: string): Promise<boolean>;
}
export default Router;
