import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-tasks.dto';
import { TasksRepository } from './task.repository'
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { TaskStatus } from './task-status.enum';

@Injectable()
export class TasksService {
    constructor (
        @InjectRepository(TasksRepository)
        private taskRepository: TasksRepository,
    ){}

    async getTasks(filterDto: GetTaskFilterDto): Promise<Task[]> {
        return await this.taskRepository.getTask(filterDto);
    }

    async getTaskById(id: number): Promise<Task> {
        const found = await this.taskRepository.findOne(id);
        if (!found){
            throw new NotFoundException(`There is no task with id: ${id}`);
        }
        return found;
    }

    async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
        return this.taskRepository.createTask(createTaskDto)
    }

    async deleteTaskById(id: number): Promise<void> {
        const result = await this.taskRepository.delete(id);
        if (result.affected === 0 ){
            throw new NotFoundException(`Task with id: ${id}, not found`)
        }
    }

    async updateTaskStatus(id: number, status: TaskStatus): Promise<Task> {
        const task = await this.getTaskById(id);
        task.status = status;
        await task.save();
        return task;
      }
}
