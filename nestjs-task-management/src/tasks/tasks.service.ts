import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-tasks.dto';
import { TasksRepository } from './task.repository'
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TasksService {


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

    // getTaskById(id: string): Task {
    //     const found = this.tasks.find((task: Task) => task.id === id);
    //     if (!found){
    //         throw new NotFoundException(`There is no task with id: ${id}`);
    //     }
    //     return found;
    // }

    // createTask(createTaskDto: CreateTaskDto): Task {
    //     const {title, description} = createTaskDto;
    //     const task: Task = {
    //      //   id: uuid(),
    //      // TODO: Uncomment the one on top and delete the on of the bottom
    //         id: this.tasks.length.toString(),
    //         title,
    //         description,
    //         status: TaskStatus.OPEN,
    //     };
    //     this.tasks.push(task);
    //     return task;
    // }

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
