import { Controller, Route } from '../core';
import { Request, Response } from 'express';
import { Job } from '../models/job.model';

export default class JobsController extends Controller {
    @Route({
        path: '/jobs/:id',
        method: 'get'
    })
    public async get(request: Request, response: Response) {
        const id = request.params.id;

        if (!id) {
            response.status(400).json({ message: 'Invalid id' });
            return;
        }

        const job = await Job.findByPk(id);

        if (!job) {
            response.status(404).json({ message: 'Job not found' });
            return;
        }

        response.json(job);
    }

    @Route({
        path: '/jobs',
        method: 'get'
    })
    public async getAll(request: Request, response: Response) {
        console.log('test');
        const jobs = await Job.findAll();
        response.json(jobs);
    }

    @Route({
        path: '/jobs',
        method: 'post'
    })
    public async create(request: Request, response: Response) {
        const title = request.body.title;
        const exists = await Job.findOne({ where: { title } });

        if (exists) {
            response.status(400).json({ message: 'Name already exists' });
            return;
        }

        try {
            const job = await Job.create(request.body);
            response.json(job);
        } catch (error) {
            response.status(500).json({ message: error.message });
        }
    }

    @Route({
        path: '/jobs/:id',
        method: 'put'
    })
    public async update(request: Request, response: Response) {
        const id = request.params.id;
        const title = request.body.title;

        const exists = await Job.findOne({ where: { title } });

        if (exists && exists.id !== id) {
            response.status(400).json({ message: 'Name already exists' });
            return;
        }

        if (!id) {
            response.status(400).json({ message: 'Invalid id' });
            return;
        }

        const job = await Job.findByPk(id);

        if (!job) {
            response.status(404).json({ message: 'Job not found' });
            return;
        }

        try {
            await job.update(request.body);
            response.json(job);
        } catch (error) {
            response.status(500).json({ message: error.message });
        }
    }

    @Route({
        path: '/jobs/:id',
        method: 'delete'
    })
    public async delete(request: Request, response: Response) {
        const id = request.params.id;

        if (!id) {
            response.status(400).json({ message: 'Invalid id' });
            return;
        }

        const job = await Job.findByPk(id);

        if (!job) {
            response.status(404).json({ message: 'Job not found' });
            return;
        }

        try {
            await job.destroy();
        } catch (error) {
            response.status(500).json({ message: error.message });
            return;
        }

        response.json(job);
    }
};
