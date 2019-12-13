import { PipeTransform, BadRequestException } from "@nestjs/common";
import { TaskStatus } from "../task-status.enum";

export class TaskStatusValidationPipe implements PipeTransform {
    readonly validOptions = new Set([TaskStatus.CLOSED, TaskStatus.DONE, TaskStatus.OPEN]) 
    private checkIfInvalid(value: any){
        return !this.validOptions.has(value);
    }
    transform(value: any){
        value.toUpperCase();
        if(this.checkIfInvalid(value)){
            throw new BadRequestException(`status: ${value} is invalid`);
        }
        return value;
    }
}