export interface Task {
    id: number;
    title: string;
    description: string;
    status: TaskStatus;
}

export enum TaskStatus {
    OPEN = 'OPEN',
    CLOSED = 'CLOSED',
    DONE = 'DONE',
}
