import { Controller, Get, Post, Body, Param, Delete, Patch, Query, UsePipes, ValidationPipe, ParseIntPipe, UseGuards } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TaskStatus } from './task-status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-tasks.dto';
import { TaskStatusValidationPipe } from './pipes/task-status.pipe';
import { Task } from './task.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
    constructor(private taskService: TasksService) {}

        @Get()
        getAllTasks(@Query(ValidationPipe) filterDto: GetTaskFilterDto) {
            return this.taskService.getTasks(filterDto)
        }

        @Get('/:id')
        getTaskById(@Param('id', ParseIntPipe) id: number): Promise<Task> {
            return this.taskService.getTaskById(id);
        }

        @Post()
        @UsePipes(ValidationPipe)
        createTask(@Body() createTask: CreateTaskDto): Promise<Task> {
            return this.taskService.createTask(createTask);
        }

        @Delete('/:id')
        deleteTaskById(@Param('id', ParseIntPipe) id: number): Promise<void> {
           const found = this.taskService.deleteTaskById(id);
           return found;
        }

        @Patch('/:id/status')
        updateTaskStatus(
          @Param('id', ParseIntPipe) id: number,
          @Body('status', TaskStatusValidationPipe) status: TaskStatus,
        ): Promise<Task> {
            return this.taskService.updateTaskStatus(id, status);
        }

}
