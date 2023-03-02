import { DOUBLE } from 'sequelize';
import { Table, Column, Model, HasMany } from 'sequelize-typescript';

@Table({
    tableName: 'jobs',
})
export class Job extends Model<Job> {
    @Column({
        unique: true,
    })
    title: string;

    @Column({
        field: 'min_salary',
        type: DOUBLE
    })
    minSalary: number;

    @Column({
        field: 'max_salary',
        type: DOUBLE
    })
    maxSalary: number;
};