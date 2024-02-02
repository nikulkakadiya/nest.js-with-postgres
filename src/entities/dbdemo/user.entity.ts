// TBD
import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { Notes } from './notes.entity';

// TBD
@Table({
  modelName: 'user',
  tableName: 'user',
})

// TBD
export class User extends Model<User> {
  // TBD
  @Column({
    type: DataType.STRING,
    allowNull: false,
    primaryKey: true,
    field: 'user_id',
  })

  // TBD
  userId: string;

  // TBD
  @Column({
    type: DataType.STRING,
    field: 'name',
  })

  // TBD
  name: string;

  // TBD
  @Column({
    type: DataType.STRING,
    field: 'email',
    unique:true
  })

  // TBD
  email: string;

  // TBD
  @Column({
    type: DataType.STRING,
    field: 'password',
  })

  // TBD
  password: string;

  // Define the one-to-many relationship with the Notes entity
  @HasMany(() => Notes)
  notes: Notes[];
}
