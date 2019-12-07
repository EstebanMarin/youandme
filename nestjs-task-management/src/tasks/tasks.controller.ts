import { Controller, Get, Post, Body, Param, Delete, Patch } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task, TaskStatus } from './tasks.models';
import { CreateTaskDto } from './dto/create-task.dto';
import bodyParser = require('body-parser');

@Controller('tasks')
export class TasksController {
    constructor(private taskService: TasksService) {}
        @Get()
        getAllTasks(): Task[] {
            return this.taskService.getAllTasks();
        }

        @Get('/:id')
        getTaskById(@Param('id') id: string): Task {
            return this.taskService.getTaskById(id);
        }

        @Post()
        createTask(@Body() createTask: CreateTaskDto): Task {
            return this.taskService.createTask(createTask);
        }

        @Delete('/:id')
        deleteTaskById(@Param('id') id: string): void {
            this.taskService.deleteTaskById(id);
        }

        @Patch(':id/:status')
        updateTaskStatus(
            @Param('id') id: string,
            @Body('status') status: TaskStatus,
        ): Task {
            return this.taskService.updateTaskStatus(id, status);
        }
}
