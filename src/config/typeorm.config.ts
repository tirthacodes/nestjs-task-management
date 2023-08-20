import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/auth/entity/user.entity";
import { Task } from "src/tasks/entity/task.entity";

export const typeOrmConfig : TypeOrmModule = {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'testuser',
    password: 'testuser123',
    database: 'taskmanagement',
    entities: [Task, User],
    synchronize: true,
}