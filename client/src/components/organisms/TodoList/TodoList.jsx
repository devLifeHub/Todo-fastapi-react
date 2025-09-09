import TodoItem from "@/components/molecules/TodoItem/TodoItem"

import todoThunks from "@/store/todo/todoThunks"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import s from "./TodoList.module.scss"
import clsx from "clsx"
import { selectTodoList } from "@/store/todo/todoSelectors"


const TodoList = () => {
    const dispatch = useDispatch()
    const { fetchTodos } = todoThunks
    const todoList = useSelector(selectTodoList)


    useEffect(() => {
        dispatch(fetchTodos())
    }, [])

    
    return (
        <>
            {todoList.length === 0 && 
                <div className={clsx(s["todo__zero"])}>
                    <p className={clsx(s["todo__zero-text"])}>You do not have any ToDo at the moment. To add notes, click on </p>
                    <span className={clsx(s["todo__zero-icon"])}></span>
                </div>
            }
            <ul className={s["todo-list"]}>
                {todoList.map(todo => (
                    <TodoItem className={s["todo-item"]} key={todo.id} todo={todo} />
                ))}
            </ul>
        </>
    ) 
}

export default TodoList