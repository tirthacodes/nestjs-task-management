import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dtos/CreateTask.dto';
import { GetTaskFilterDto } from './dtos/GetTaskFilter.dto';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entity/task.entity';
import { Repository } from 'typeorm';


@Injectable()
export class TasksService {

    constructor(
        @InjectRepository(Task) private taskRepository: Repository<Task>,
    ){

    }

// private tasks: Task[] = [];

// getAllTasks(): Task[] {
//     return this.tasks;
// }

// getTasksWithFilters(filterDto: GetTaskFilterDto ): Task[]{
//     const {status, search } =filterDto;

//     let tasks = this.getAllTasks();
//     if(status){
//         tasks = tasks.filter(task => task.status === status );
//     }

//     if(search){
//         tasks = tasks.filter(task => task.title.includes(search) || task.description.includes(search));
//     }

//     return tasks;
// }

async getTaskById(id: number): Promise<Task> {
    const found = await this.taskRepository.findOne({ where: { id } });

    if(!found){
        throw new NotFoundException(`Task with ID ${id} not Found`);
    }

    return found;
}


// createTask(createTaskDto: CreateTaskDto): Task {

//     const {title, description} = createTaskDto;

//     const task: Task = {
//         id: uuidv4(),
//         title,
//         description,
//         status: TaskStatus.OPEN,
//     };
//     this.tasks.push(task);
//     return task;
// }

// deleteTask(id: string): void{
//     const found = this.getTaskById(id);
//     this.tasks = this.tasks.filter(task => task.id !== found.id);
// }

// updateTaskStatus(id: string, status: TaskStatus): Task{
//     const task = this.getTaskById(id)
//     task.status = status;
//     return task;
// }

}
