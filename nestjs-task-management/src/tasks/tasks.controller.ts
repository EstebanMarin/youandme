import { Controller, Get, Post, Body, Param, Delete, Patch, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task, TaskStatus } from './tasks.models';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-tasks.dto';
import { TaskStatusValidationPipe } from './pipes/task-status.pipe';

@Controller('tasks')
export class TasksController {
    constructor(private taskService: TasksService) {}
        @Get()
        getAllTasks(@Query(ValidationPipe) filterDto: GetTaskFilterDto): Task[] {
            if (Object.keys(filterDto).length) {
                return this.taskService.getTaskWithFilter(filterDto);
            } else {
                return this.taskService.getAllTasks();
            }
        }

        @Get('/:id')
        getTaskById(@Param('id') id: string): Task {
            return this.taskService.getTaskById(id);
        }

        @Post()
        @UsePipes(ValidationPipe)
        createTask(@Body() createTask: CreateTaskDto): Task {
            return this.taskService.createTask(createTask);
        }

        @Delete('/:id')
        deleteTaskById(@Param('id') id: string): void {
            this.taskService.deleteTaskById(id);
        }

        @Patch(':id/status')
        updateTaskStatus(
            @Param('id') id: string,
            @Body('status', TaskStatusValidationPipe) status: TaskStatus,
        ): Task {
            return this.taskService.updateTaskStatus(id, status);
        }
}
