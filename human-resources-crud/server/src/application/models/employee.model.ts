import { Table, Column, Model, HasOne, BelongsTo, Scopes, ForeignKey } from 'sequelize-typescript';
import { Job } from './job.model';
import { Department } from './department.model';


@Table({
    tableName: 'employees',
})
export class Employee extends Model<Employee> {
    @Column
    firstname: string;

    @Column
    lastname: string;

    @Column({
        unique: true,
    })
    email: string;

    @Column
    phone: string;

    @Column
    salary: number;

    @Column({ field: 'hire_date' })
    hireDate: Date;

    @BelongsTo(() => Job, { foreignKey: 'job_id', onDelete: 'RESTRICT', onUpdate: 'CASCADE' })
    job: Job;

    @BelongsTo(() => Department, { foreignKey: 'department_id', onDelete: 'RESTRICT', onUpdate: 'CASCADE' })
    department: Department;

    @ForeignKey(() => Job)
    @Column({ field: 'job_id' })
    jobId: number;

    @ForeignKey(() => Department)
    @Column({ field: 'department_id' })
    @Column
    departmentId: number;
};