import { Controller, Route } from '../core';
import { Request, Response } from 'express';
import { Employee } from '../models/employee.model';
import { Job } from '../models/job.model';
import { Department } from '../models/department.model';

export default class EmployeesController extends Controller {
    @Route({
        path: '/employees/:id',
        method: 'get'
    })
    public async get(request: Request, response: Response) {
        const id = request.params.id;

        if (!id) {
            response.status(400).json({ message: 'Invalid id' });
            return;
        }

        const employee = await Employee.findByPk(id, {
            include: [Job, Department]
        });

        if (!employee) {
            response.status(404).json({ message: 'Employee not found' });
            return;
        }

        response.json(employee);
    }

    @Route({
        path: '/employees',
        method: 'get'
    })
    public async getAll(request: Request, response: Response) {
        const employees = await Employee.findAll({
            include: [Job, Department]
        });
        response.json(employees);
    }

    @Route({
        path: '/employees',
        method: 'post'
    })
    public async create(request: Request, response: Response) {
        const email = request.body.email;
        const exists = await Employee.findOne({ where: { email } });

        if (exists) {
            response.status(400).json({ message: 'Email already exists' });
            return;
        }

        try {
            const employee = await Employee.create({
                ...request.body
            }, {
                include: [Job, Department]
            });
            response.json(employee);
        } catch (error) {
            response.status(500).json({ message: error.message });
        }
    }

    @Route({
        path: '/employees/:id',
        method: 'put'
    })
    public async update(request: Request, response: Response) {
        const id = request.params.id;
        const email = request.body.email;
        
        // check if name already exists and id is not the same
        const exists = await Employee.findOne({ where: { email } });
        if (exists && exists.id !== id) {
            response.status(400).json({ message: 'Email already exists' });
            return;
        }

        if (!id) {
            response.status(400).json({ message: 'Invalid id' });
            return;
        }

        const employee = await Employee.findByPk(id);

        if (!employee) {
            response.status(404).json({ message: 'Employee not found' });
            return;
        }

        try {
            await employee.update(request.body);
            response.json(employee);
        } catch (error) {
            response.status(500).json({ message: error.message });
        }
    }

    @Route({
        path: '/employees/:id',
        method: 'delete'
    })
    public async delete(request: Request, response: Response) {
        const id = request.params.id;

        if (!id) {
            response.status(400).json({ message: 'Invalid id' });
            return;
        }

        const employee = await Employee.findByPk(id);

        if (!employee) {
            response.status(404).json({ message: 'Employee not found' });
            return;
        }

        try {
            await employee.destroy();
        } catch (error) {
            response.status(500).json({ message: error.message });
            return;
        }

        response.json(employee);
    }
};
