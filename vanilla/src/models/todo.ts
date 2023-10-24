export interface Todo {
    id: number;
    text: string;
    createdAt: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}
