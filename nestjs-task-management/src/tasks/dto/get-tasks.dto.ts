import { TaskStatus } from '../tasks.models';
import { IsOptional, IsIn, IsNotEmpty } from 'class-validator';

export class GetTaskFilterDto {
    @IsOptional()
    @IsIn([TaskStatus.OPEN, TaskStatus.CLOSED, TaskStatus.DONE])
    status: TaskStatus;
    @IsOptional()
    @IsNotEmpty()
    search: string;
}
