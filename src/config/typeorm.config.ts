import { TypeOrmModule } from "@nestjs/typeorm";
import { join } from "path";

export const typeOrmConfig : TypeOrmModule = {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'testuser',
    password: 'testuser123',
    database: 'taskmanagement',
    entities: [join(__dirname, '**', '*.entity.{ts,js}')],
    synchronize: true,
}