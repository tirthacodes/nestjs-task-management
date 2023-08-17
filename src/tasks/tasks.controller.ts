import { Controller, Get, Post, Query, Body, Param, Delete, Patch, UsePipes, ValidationPipe, NotFoundException } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task, TaskStatus } from './task.model';
import { CreateTaskDto } from './dtos/CreateTask.dto';
import { GetTaskFilterDto } from './dtos/GetTaskFilter.dto';


@Controller('tasks')
export class TasksController {
constructor(private tasksService: TasksService){

}

    @Get()
    getTasks(@Query() filterDto: GetTaskFilterDto): Task[] {
        if(Object.keys(filterDto).length){
            return this.tasksService.getTasksWithFilters(filterDto);
        }
        else{
            return this.tasksService.getAllTasks();

        }
    }

    @Get(':id')
    getTaskById(@Param('id') id: string): Task{
        const found =  this.tasksService.getTaskById(id);

        if(!found){
            throw new NotFoundException(`Task with ID ${id} not Found`);
        }
        else{
            return found;
        }
    }

    @Post()
    @UsePipes(ValidationPipe)
    createTask(@Body() createTaskDto: CreateTaskDto): Task{
        return this.tasksService.createTask(createTaskDto);
    }

    @Delete(':id')
    deleteTask(@Param('id') id: string): void{
        this.tasksService.deleteTask(id);
    }

    @Patch(':id/status')
    updateTaskStatus(@Param('id') id: string, @Body('status') status: TaskStatus){
        return this.tasksService.updateTaskStatus(id, status);
    }

    


}
