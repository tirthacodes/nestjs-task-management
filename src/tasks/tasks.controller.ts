import { Controller, Get, Post, Query, Body, UseGuards, Param, Delete, Patch, UsePipes, ValidationPipe, NotFoundException, ParseIntPipe } from '@nestjs/common';
import {AuthGuard } from '@nestjs/passport'
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dtos/CreateTask.dto';
import { GetTaskFilterDto } from './dtos/GetTaskFilter.dto';
import { Task } from './entity/task.entity';
import { TaskStatus } from './task.status.enum';
import { User } from 'src/auth/entity/user.entity';
import { GetUser } from 'src/auth/get-user.decorator';


@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
constructor(private tasksService: TasksService){

}

    @Get()
    getTasks(
        @Query(ValidationPipe) filterDto: GetTaskFilterDto,
        @GetUser() user: User,
        ) : Promise<Task[]> {
        return this.tasksService.getTasks(filterDto, user);
    }

    @Get(':id')
    getTaskById(@Param('id', ParseIntPipe) id: number): Promise<Task>{
        return this.tasksService.getTaskById(id);
    }

    @Post()
    @UsePipes(ValidationPipe)
    createTask(
        @Body() createTaskDto: CreateTaskDto,
        @GetUser() user: User,
    ): Promise<Task>{
        return this.tasksService.createTask(createTaskDto, user);
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
