import { Table, Column, Model, BelongsTo } from 'sequelize-typescript';


@Table({
    tableName: 'departments',
})
export class Department extends Model<Department> {
    @Column({
        unique: true,
    })
    name: string;
};