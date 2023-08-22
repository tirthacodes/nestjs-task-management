import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dtos/CreateTask.dto';
import { GetTaskFilterDto } from './dtos/GetTaskFilter.dto';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entity/task.entity';
import { Repository } from 'typeorm';
import { TaskStatus } from './task.status.enum';
import { User } from 'src/auth/entity/user.entity';


@Injectable()
export class TasksService {

    constructor(
        @InjectRepository(Task)
        private taskRepository: Repository<Task>,
    ){

    }

    async getTasks(
        filterDto: GetTaskFilterDto,
        user: User,
        ) : Promise<Task[]>{
        return this.taskRepository.find();     
    }


async getTaskById(id: number): Promise<Task> {
    const found = await this.taskRepository.findOne({ where: { id } });

    if(!found){
        throw new NotFoundException(`Task with ID ${id} not Found`);
    }

    return found;
}

async createTask(
    createTaskDto: CreateTaskDto,
    user: User,
    ) : Promise<Task> {
    const {title, description} = createTaskDto;

    const task = new Task();
    task.title = title;
    task.description = description;
    task.status = TaskStatus.OPEN;
    task.user = user;

    await task.save();
    // delete task.user();

    return task;
}


async deleteTask(id: number) : Promise<void> {
    
    const result = await this.taskRepository.delete(id); 
    console.log(result);

    if(result.affected === 0){
        throw new NotFoundException(`Task with ID ${id} not Found`);
    }
    
}

async updateTaskStatus(id: number, status: TaskStatus) : Promise<Task> {
    const task = await this.getTaskById(id);
    task.status= status;
    await task.save();
    return task;
}

}
