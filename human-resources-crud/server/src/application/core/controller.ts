import { Application } from "../application";

export abstract class Controller {
    constructor(private _app: Application) {
        this.configureRoutes();
    }

    public init(): void {}

    public get app(): Application {
        return this._app;
    }

    private configureRoutes(): void {
        const prototype = Object.getPrototypeOf(this);
        const propertyNames = Object.getOwnPropertyNames(prototype);
        const methodNames = propertyNames.filter(name => typeof prototype[name] === 'function');

        for (const methodName of methodNames) {
            if (!Reflect.hasMetadata('path', prototype, methodName)) {
                continue;
            }

            const route = Reflect.getMetadata('path', prototype, methodName);
            const method = Reflect.getMetadata('method', prototype, methodName);

            if (route) {
                this.app.registerRoute(route, method, (this as any)[methodName].bind(this));
            }
        }
    }
}