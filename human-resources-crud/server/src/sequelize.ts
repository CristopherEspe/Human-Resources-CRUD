import { Sequelize } from 'sequelize-typescript';
import fs from 'fs';
import path from 'path';
import { Employee } from './application/models/employee.model';
import { Department } from './application/models/department.model';
import { Job } from './application/models/job.model';


const models = fs.readdirSync(path.join(__dirname, 'application/models'))
    .filter(file => file.includes('.model'))
    .map(file => path.join(__dirname, 'models', file));

export const sequelize: Sequelize = new Sequelize({
    dialect: 'mysql',
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    models: [
        Job,
        Employee,
        Department
    ] as any,
    modelMatch: (filename, member) => {
        return filename.includes('.model');
    }
});