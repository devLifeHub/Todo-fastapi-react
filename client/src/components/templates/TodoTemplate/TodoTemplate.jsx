import clsx from "clsx"
import s from "./TodoTemplate.module.scss"
import TodoControls from "@/components/molecules/TodoControls/TodoControls"
import TodoList from "@/components/organisms/TodoList/TodoList"
import { useSelector } from "react-redux"
import { selectIsAddTodoForm, selectIsDeleteTodo, selectIsUpdateTodoForm } from "@/store/actionForm/actionFormSelectors"
import TodoForm from "@/components/organisms/Forms/TodoForm/TodoForm"
import TodoDelete from "@/components/molecules/TodoDelete/TodoDelete"

   

const TodoTemplate = () => {

    const isAddTodoForm = useSelector(selectIsAddTodoForm);
    const isUpdateTodoForm = useSelector(selectIsUpdateTodoForm)
    const isDeleteTodo = useSelector(selectIsDeleteTodo)

    return (
        <div className={ clsx(s["todo-container"], "container")}>
            {isAddTodoForm && <TodoForm mode="add" />}
            {isUpdateTodoForm && <TodoForm mode="update" />}
            {isDeleteTodo && <TodoDelete />}
            <TodoList />
            <TodoControls />
        </div>
    )
}

export default TodoTemplate