import { ConfigService } from '@nestjs/config';
import { Sequelize } from 'sequelize-typescript';
import DemoDbEntities from 'src/entities/dbdemo';

// export const databaseProvider = [
//   {
//     provide: 'SEQUELIZE',
//     useFactory: async () => {
//       const sequelize = new Sequelize({
//         dialect: 'postgres',
//         host: 'localhost',
//         port: 5432,
//         username: 'postgres',
//         password: 'test',
//         database: 'postgres',
//       });
//       sequelize.addModels([User]);
//       await sequelize.sync();
//       return sequelize;
//     },
//   },
// ];
export const databaseProvider = [
  connectDatabase(
    'POSTGRES',
    'DB_USER',
    'DB_PASSWORD',
    'DB_HOST',
    'DB_PORT',
    'DEMO_DB_NAME',
    DemoDbEntities,
  ),
];

/**
 * A GENERIC FUNCTION TO GET CONNECTED WITH DIFFERENT DBS WITH DIFFERENT ID'S AND SAME CREDENTIALS
 * @param provide STRING
 * @param username STRING
 * @param password STRING
 * @param host STRING
 * @param port STRING
 * @param databaseName STRING
 * @param entities ANY
 * @returns OBJECT
 */
function connectDatabase(
  provide: string,
  username: string,
  password: string,
  host: string,
  port: string,
  databaseName: string,
  entities: any,
) {
  return {
    provide: `SEQUELIZE_${provide}`,
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) => {
      const sequelize = new Sequelize({
        dialect: 'postgres',
        username: configService.get(username),
        password: configService.get(password),
        host: configService.get(host),
        port: configService.get(port),
        database: configService.get(databaseName),
      });
      sequelize.addModels(entities);
      try {
        await sequelize.authenticate();
        console.log('Database connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
      await sequelize.sync();
      return sequelize;
    },
  };
}
