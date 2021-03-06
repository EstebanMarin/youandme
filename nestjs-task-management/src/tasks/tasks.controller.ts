import { Controller, Get, Post, Body, Param, Delete, Patch, Query, UsePipes, ValidationPipe, ParseIntPipe, UseGuards, Logger } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TaskStatus } from './task-status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-tasks.dto';
import { TaskStatusValidationPipe } from './pipes/task-status.pipe';
import { Task } from './task.entity';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
        private logger = new Logger(`tasks.controller.ts`)
        constructor(
            private taskService: TasksService,
            ) {}

        @Get()
        getAllTasks(
            @Query(ValidationPipe) filterDto: GetTaskFilterDto,
            @GetUser() user : User,
            ) {
            this.logger.verbose(`user: ${user.username}: retreiving all tasks filterDto: ${JSON.stringify(filterDto)}`)
            return this.taskService.getTasks(filterDto, user);
        }

        @Get('/:id')
        getTaskById(
            @Param('id', ParseIntPipe) id: number, 
            @GetUser() user: User,
            ): Promise<Task> {
            return this.taskService.getTaskById(id, user);
        }

        @Post()
        @UsePipes(ValidationPipe)
        createTask(
            @Body() createTask: CreateTaskDto,
            @GetUser() user: User,
            ): Promise<Task> {
            return this.taskService.createTask(createTask, user);
        }

        @Delete('/:id')
        deleteTaskById(
            @Param('id', ParseIntPipe) id: number,
            @GetUser() user: User,
            ): Promise<void> {
           const found = this.taskService.deleteTaskById(id, user);
           return found;
        }

        @Patch('/:id/status')
        updateTaskStatus(
          @Param('id', ParseIntPipe) id: number,
          @Body('status', TaskStatusValidationPipe) status: TaskStatus,
          @GetUser() user: User,
        ): Promise<Task> {
            return this.taskService.updateTaskStatus(id, status, user);
        }

}
