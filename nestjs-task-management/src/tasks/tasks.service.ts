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

    // getAllTasks(): Task[] {
    //     return this.tasks;
    // }

    // getTaskWithFilter(filterDto: GetTaskFilterDto): Task[] {
    //     const { status, search } = filterDto;
    //     let tasks = this.getAllTasks();

    //     if (status) {
    //         tasks = tasks.filter(task => task.status === status);
    //     }

    //     if (search) {
    //         tasks = tasks.filter(task =>
    //             task.title.includes(search) ||
    //             task.description.includes(search),
    //             );
    //     }

    //     return tasks;
    // }

    async getTaskById(id: number): Promise<Task> {
        const found = await this.taskRepository.findOne(id);
        if (!found){
            throw new NotFoundException(`There is no task with id: ${id}`);
        }
        return found;
    }

    // getTaskById(id: string): Task {
    //     const found = this.tasks.find((task: Task) => task.id === id);
    //     if (!found){
    //         throw new NotFoundException(`There is no task with id: ${id}`);
    //     }
    //     return found;
    // }

    async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
        return this.taskRepository.createTask(createTaskDto)
    }

    async deleteTaskById(id: number){
        
    }
    // deleteTaskById(id: string): void {
    //     const found = this.getTaskById(id);
    //     this.tasks = this.tasks.filter(task => found.id !== task.id );
    // }

    // updateTaskStatus(id: string, status: TaskStatus): Task {
    //     const task: Task = this.getTaskById(id);
    //     task.status = status;
    //     return task;
    // }
}
