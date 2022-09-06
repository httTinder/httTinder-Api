import { DataSource } from "typeorm";
import "dotenv/config";

const AppDataSource =
  process.env.NODE_ENV === "test"
    ? new DataSource({
        type: "postgres",
        host: process.env.DB_HOST,
        port: 5432,
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: "tinder_db_teste",
        logging: true,
        synchronize: true,
        entities: ["src/entities/**/*.ts"],
      })
    : new DataSource({
        type: "postgres",
        host: process.env.DB_HOST,
        port: 5432,
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB,
        logging: true,
        synchronize: true,
        entities: ["src/entities/**/*.ts"],
        migrations: ["src/migrations/*.ts"],
      });

export default AppDataSource;
