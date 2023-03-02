import { Controller, Route } from '../core';
import { Request, Response } from 'express';
import { Department } from '../models/department.model';

export default class DepartmentsController extends Controller {
    @Route({
        path: '/departments/:id',
        method: 'get'
    })
    public async get(request: Request, response: Response) {
        const id = request.params.id;

        if (!id) {
            response.status(400).json({ message: 'Invalid id' });
            return;
        }

        const department = await Department.findByPk(id);

        if (!department) {
            response.status(404).json({ message: 'Department not found' });
            return;
        }

        response.json(department);
    }

    @Route({
        path: '/departments',
        method: 'get'
    })
    public async getAll(request: Request, response: Response) {
        console.log('test');
        const departments = await Department.findAll();
        response.json(departments);
    }

    @Route({
        path: '/departments',
        method: 'post'
    })
    public async create(request: Request, response: Response) {
        const name = request.body.name;
        const exists = await Department.findOne({ where: { name } });

        if (exists) {
            response.status(400).json({ message: 'Name already exists' });
            return;
        }

        try {
            const department = await Department.create(request.body);
            response.json(department);
        } catch (error) {
            response.status(500).json({ message: error.message });
        }
    }

    @Route({
        path: '/departments/:id',
        method: 'put'
    })
    public async update(request: Request, response: Response) {
        const id = request.params.id;
        const name = request.body.name;
        
        // check if name already exists and id is not the same
        const exists = await Department.findOne({ where: { name } });
        if (exists && exists.id !== id) {
            response.status(400).json({ message: 'Name already exists' });
            return;
        }

        if (!id) {
            response.status(400).json({ message: 'Invalid id' });
            return;
        }

        const department = await Department.findByPk(id);

        if (!department) {
            response.status(404).json({ message: 'Department not found' });
            return;
        }

        try {
            await department.update(request.body);
            response.json(department);
        } catch (error) {
            response.status(500).json({ message: error.message });
        }
    }

    @Route({
        path: '/departments/:id',
        method: 'delete'
    })
    public async delete(request: Request, response: Response) {
        const id = request.params.id;

        if (!id) {
            response.status(400).json({ message: 'Invalid id' });
            return;
        }

        const department = await Department.findByPk(id);

        if (!department) {
            response.status(404).json({ message: 'Department not found' });
            return;
        }

        try {
            await department.destroy();
        } catch (error) {
            response.status(500).json({ message: error.message });
            return;
        }
        
        response.json(department);
    }
};
