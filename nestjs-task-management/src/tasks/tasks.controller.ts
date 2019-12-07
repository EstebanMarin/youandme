import { Controller, Get, Post, Body } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './tasks.models';
import { CreateTaskDto } from './dto/create-task.dto';
import bodyParser = require('body-parser');

@Controller('tasks')
export class TasksController {
    constructor(private taskService: TasksService) {}
        @Get()
        getAllTasks(): Task[] {
            return this.taskService.getAllTasks();
        }
        @Post()
         createTask(@Body() createTask: CreateTaskDto): Task {
            return this.taskService.createTask(createTask);
        }
}
