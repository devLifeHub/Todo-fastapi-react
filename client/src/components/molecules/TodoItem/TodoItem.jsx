import dateTimeUtc from "@/utils/dateTimeUtc"
import PropTypes from "prop-types"
import TimestampWrap from "@/components/atoms/Wrap/TimestampWrap"

import s from "./TodoItem.module.scss"
import RectСornerWrap from "@/components/atoms/Wrap/RectСornerWrap/RectСornerWrap"
import clsx from "clsx"

import TodoTimer from "../TodoTimer/TodoTimer"
import IconBtnArrow from "@/components/atoms/IconsBtn/IconBtnArrow"
import { useDispatch, useSelector } from "react-redux"
import todoThunks from "@/store/todo/todoThunks"
import { selectTodoCurrent } from "@/store/todo/todoSelectors"
import { clearTodoItem } from "@/store/todo/todoSlice"
import ButtonIcon from "@/components/atoms/ButtonIcon/ButtonIcon"


const TodoItem = ({ todo }) => {
    const dispatch = useDispatch()
    const { fetchTodo } = todoThunks;
    const isCompleted = todo.is_completed
    const isFail = todo.is_fail

    const { date, time } = dateTimeUtc(todo.created_at)
    
    const todoItem = useSelector(selectTodoCurrent);
    
    const isActive = todoItem?.id === todo.id;
    
    const toggleActiveTodo = () => dispatch(isActive ? clearTodoItem() : fetchTodo(todo.id))


    return (
        <li className={clsx(s["todo-item"], isActive && s["todo--active"], isCompleted && s["todo--completed"], isFail && s["todo--fail"])}>
            <div className={s["todo-item__timestamp"]}>
                <TimestampWrap className={s["todo-item__timestamp-wrap"]} />
                <p className={s["todo-item__timestamp-date"]}>{date}</p>
                <p className={s["todo-item__timestamp-time"]}>{time}</p>
            </div>
            <div className={s["todo-item__note"]}>
                <TodoTimer todoId={todo.id} />
                <div className={s["todo-item__note-wrap"]}>
                    <RectСornerWrap extraClass={clsx(isCompleted && s["todo--completed"], isFail && s["todo--fail"])} />
                    <div className={clsx(s["todo-item__content"])}>
                        <div className={clsx(s["todo-item__content__title"])}>
                            <span className={clsx(s["todo-item__content__title-label"])}>title:</span>
                            <p className={s["todo-item__content__title-text"]}>{todo.title}</p>
                        </div>
                        <div className={clsx(s["todo-item__content__descr"])}>
                            <span className={clsx(s["todo-item__content__descr-label"], isCompleted && s["todo--completed"], isFail && s["todo--fail"])}>description:</span>
                            <p className={s["todo-item__content__descr-text"]}>{todo.description}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className={s["todo-item__control"]}>
                <ButtonIcon btnClass={clsx(s["btn-icon"], isActive && s["btn--active"])} handle={toggleActiveTodo}>
                    <IconBtnArrow  wrapClass={clsx(s["btn-icon__wrap"])} iconClass={clsx(s["btn-icon__icon"])}/>
                </ButtonIcon>
            </div>
        </li>
    )
}

TodoItem.propTypes = {
    todo: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    is_completed: PropTypes.bool.isRequired,
    is_fail: PropTypes.bool.isRequired,
    created_at: PropTypes.string.isRequired,
    end_date: PropTypes.string
    }).isRequired
}

export default TodoItem