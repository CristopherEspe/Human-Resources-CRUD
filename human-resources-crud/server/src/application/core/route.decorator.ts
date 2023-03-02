export type RouteMethodName = 'get' | 'post' | 'put' | 'delete';

export function Route(data: { path: string, method: RouteMethodName }) {
    return function (
        target: Object,
        key: string | symbol,
        descriptor: PropertyDescriptor) {
        Reflect.defineMetadata('path', data.path, target, key);
        Reflect.defineMetadata('method', data.method, target, key);
    }
};