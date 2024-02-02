// TBD
import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { User } from './user.entity';

// TBD
@Table({
  modelName: 'notes',
  tableName: 'notes',
})

// TBD
export class Notes extends Model<Notes> {
  // TBD
  @Column({
    type: DataType.STRING,
    allowNull: false,
    primaryKey: true,
    field: 'note_id',
  })

  // TBD
  noteId: string;

  // TBD
  @Column({
    type: DataType.STRING,
    field: 'title',
  })

  // TBD
  title: string;

  // TBD
  @Column({
    type: DataType.STRING,
    field: 'description',
  })

  // TBD
  description: string;

  // TBD
  @Column({
    type: DataType.STRING,
    field: 'tag',
    defaultValue: "General"
  })

  // TBD
  tag: string;

  // Define the foreign key relationship with the User entity
  @ForeignKey(() => User)
  @Column({
    field: 'user_id',
    allowNull: false,
  })
  userId: string;

  @BelongsTo(() => User)
  user: User;
}
