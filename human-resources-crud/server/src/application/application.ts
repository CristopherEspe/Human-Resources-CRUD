import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { Controller, RouteMethodName } from './core';

type ControllerClass = new (...args: any[]) => Controller;

export class Application {
    private readonly express: Express;
    private _port: number = null;

    constructor(_port: number = null) {
        this._port = _port || parseInt(process.env.PORT) || 3001;
        this.express = express();
        this.express.use(cors({ origin: '*' }));
        this.express.use(express.json());
        this.express.use(express.urlencoded({ extended: true }));
    }

    run(): void {
        console.log('Inicializando servidor');
        this.registerAllControllers();
        this.express.listen(this._port, () => {
            console.log(`Servidor inicializado en http://localhost:${this._port}`);
        });
    }

    async registerAllControllers(): Promise<void> {
        const controllersClasses = await this.getControllers();

        for (const ControllerClass of controllersClasses) {
            const instance = new ControllerClass(this);
            instance.init();
        }
    }

    registerRoute(path: string, method: RouteMethodName, handler: Function): void {
        console.log(`Registering route ${method.toUpperCase()} ${path}`);

        this.express[method](path, (request: Request, response: Response) => {
            try {
                handler(request, response);
            } catch (exception) {
                console.error(exception);
                response.status(500).json({
                    error: 'INTERNAL_ERROR',
                    message: exception.message
                });
            }
        });
    }

    private async getControllers(): Promise<ControllerClass[]> {
        const controllersPath = path.join(__dirname, 'controllers');
        const files: any[] = fs.readdirSync(controllersPath)
            .filter(file => {
                const filePath = path.join(controllersPath, file);
                return file.endsWith('.controller.ts') && fs.lstatSync(filePath).isFile();
            });

        const classes: ControllerClass[] = [];

        for (const file of files) {
            const filePath = path.join(controllersPath, file);
            const module = await import(filePath);
            classes.push(module.default);
        }

        return classes;
    }
}