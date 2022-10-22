import { Dispatch, SetStateAction } from "react";

export interface ITodoForm{
    title: string,
    setTitle: Dispatch<SetStateAction<string>>
    dueDate: Date,
    setDueDate: Dispatch<SetStateAction<Date>>
    addTodo: () => void;
}

export interface ITodo{
    id?: number,
    title: string,
    isDone: boolean,
    dueDate: Date
}

export interface ITodoItem{
    id?: number,
    title: string,
    isDone: boolean,
    dueDate: Date,
    removeTodo: (id: number | undefined) => void,
    markTodo: (id?: number) => void,
    editTodo: (id?: number, title?: string) => void,
}