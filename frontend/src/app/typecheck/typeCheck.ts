export interface Todo {
    _id: string;
    title: string;
    description?: string;
    createdAt: string | Date;
}