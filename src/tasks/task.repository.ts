import { EntityRepository, Repository } from "typeorm";
import { Task } from "./entity/task.entity";
import { GetTaskFilterDto } from "./dtos/GetTaskFilter.dto";
import { InjectRepository } from "@nestjs/typeorm";

@EntityRepository(Task)
export class TaskRepository extends Repository<Task>{

    async getTasks(filterDto: GetTaskFilterDto) : Promise<Task[]>{
        const {status, search } = filterDto;
        const query = this.createQueryBuilder('task');

        const tasks = await query.getMany();
        return tasks;
    }
}