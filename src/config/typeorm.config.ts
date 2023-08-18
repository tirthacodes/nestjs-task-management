import { TypeOrmModule } from "@nestjs/typeorm";
import { join } from "path";
import { Task } from "src/tasks/entity/task.entity";

export const typeOrmConfig : TypeOrmModule = {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'testuser',
    password: 'testuser123',
    database: 'taskmanagement',
    entities: [Task],
    synchronize: true,
}