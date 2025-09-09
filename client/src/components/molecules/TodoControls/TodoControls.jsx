import clsx from "clsx"
import s from "./TodoControls.module.scss"
import ControlWrap from "@/components/atoms/Wrap/ControlWrap"
import IconBtnCompleted from "@/components/atoms/IconsBtn/IconBtnCompleted"
import IconBtnNotCompleted from "@/components/atoms/IconsBtn/IconBtnNotCompleted"
import IconBtnEdit from "@/components/atoms/IconsBtn/IconBtnEdit"
import IconBtnAdd from "@/components/atoms/IconsBtn/IconBtnAdd"
import { useDispatch, useSelector } from "react-redux"
import { showAddTodoForm, showDeleteTodoForm, showUpdateTodoForm } from "@/store/actionForm/actionFormSlice"
import IconBtnDelete from "@/components/atoms/IconsBtn/IconBtnDelete"
import todoThunks from "@/store/todo/todoThunks"
import { selectTodoCurrent } from "@/store/todo/todoSelectors"
import ButtonIcon from "@/components/atoms/ButtonIcon/ButtonIcon"

const TodoControls = () => {
    const dispatch = useDispatch()
    const { patchTodo } = todoThunks;
    
    const todoItem = useSelector(selectTodoCurrent)
    const isTodoItem = !todoItem || Object.keys(todoItem).length === 0;

    const updateCompletion = (is_completed, is_fail) => dispatch(patchTodo({ id: todoItem.id, data: { is_completed, is_fail, end_date: null }}))

    return (
        <div className={clsx(s["controls-container"])}>
                <ControlWrap className={clsx(s["controls-wrap"])}/>
                <ul className={clsx(s["controls__list"])}>
                    <li className={clsx(s["controls__item"])}>
                        <ButtonIcon btnClass={clsx(s["btn-icon"])} handle={() => dispatch(showAddTodoForm())}>
                            <IconBtnAdd  wrapClass={clsx(s["btn-icon__wrap"])} iconClass={clsx(s["btn-icon__icon"])}/>
                        </ButtonIcon>
                    </li>
                    <li className={clsx(s["controls__item"], isTodoItem && s["item--hidden"])}>
                        <ButtonIcon btnClass={clsx(s["btn-icon"])} handle={() => updateCompletion(true, false)}>
                            <IconBtnCompleted  wrapClass={clsx(s["btn-icon__wrap"])} iconClass={clsx(s["btn-icon__icon"])}/>
                        </ButtonIcon>
                    </li>
                    <li className={clsx(s["controls__item"], isTodoItem && s["item--hidden"])}>
                        <ButtonIcon btnClass={clsx(s["btn-icon"])} handle={() => updateCompletion(false, false)}>
                            <IconBtnNotCompleted  wrapClass={clsx(s["btn-icon__wrap"])} iconClass={clsx(s["btn-icon__icon"])}/>
                        </ButtonIcon>
                    </li>
                    <li className={clsx(s["controls__item"], isTodoItem && s["item--hidden"])}>
                        <ButtonIcon btnClass={clsx(s["btn-icon"])} handle={() => dispatch(showUpdateTodoForm())}>
                            <IconBtnEdit  wrapClass={clsx(s["btn-icon__wrap"])} iconClass={clsx(s["btn-icon__icon"])}/>
                        </ButtonIcon>
                    </li>
                    <li className={clsx(s["controls__item"], isTodoItem && s["item--hidden"])}>
                        <ButtonIcon btnClass={clsx(s["btn-icon"])} handle={() => dispatch(showDeleteTodoForm())}>
                            <IconBtnDelete  wrapClass={clsx(s["btn-icon__wrap"])} iconClass={clsx(s["btn-icon__icon"])}/>
                        </ButtonIcon>
                    </li>
                </ul>
        </div>
    )
}

export default TodoControls