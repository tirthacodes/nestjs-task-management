import { Controller, Get, Post, Query, Body, Param, Delete, Patch, UsePipes, ValidationPipe, NotFoundException, ParseIntPipe } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dtos/CreateTask.dto';
import { GetTaskFilterDto } from './dtos/GetTaskFilter.dto';
import { Task } from './entity/task.entity';
import { TaskStatus } from './task.status.enum';


@Controller('tasks')
export class TasksController {
constructor(private tasksService: TasksService){

}

    // @Get()
    // getTasks(@Query(ValidationPipe) filterDto: GetTaskFilterDto): Task[] {
    //     if(Object.keys(filterDto).length){
    //         return this.tasksService.getTasksWithFilters(filterDto);
    //     }
    //     else{
    //         return this.tasksService.getAllTasks();

    //     }
    // }

    @Get(':id')
    getTaskById(@Param('id', ParseIntPipe) id: number): Promise<Task>{
        return this.tasksService.getTaskById(id);
    }

    @Post()
    @UsePipes(ValidationPipe)
    createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task>{
        return this.tasksService.createTask(createTaskDto);
    }

    @Delete(':id')
    deleteTask(@Param('id', ParseIntPipe) id: number) : Promise<void>{
        return this.tasksService.deleteTask(id);
    }

    @Patch(':id/status')
    updateTaskStatus(@Param('id', ParseIntPipe) id: number, @Body('status',) status: TaskStatus) : Promise<Task>{
        return this.tasksService.updateTaskStatus(id, status);
    }

    


}
