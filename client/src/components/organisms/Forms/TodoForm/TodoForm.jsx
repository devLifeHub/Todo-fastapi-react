import Modal from "@/components/atoms/Modal/Modal";
import todoThunks from "@/store/todo/todoThunks";
import clsx from "clsx";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import IconBtnSend from "@/components/atoms/IconsBtn/IconBtnSend";
import IconBtnTimer from "@/components/atoms/IconsBtn/IconBtnTimer";
import IconBtnNotCompleted from "@/components/atoms/IconsBtn/IconBtnNotCompleted";

import s from "./TodoForm.module.scss";
import PropTypes from "prop-types";
import { selectIsAddTodoForm, selectIsUpdateTodoForm } from "@/store/actionForm/actionFormSelectors";

import { selectTodoCurrent } from "@/store/todo/todoSelectors";
import { clearTodoItem } from "@/store/todo/todoSlice";
import { getDateTimeFromISO, getNowDateTimeInZone } from "@/utils/dateTime";
import { useAnimated } from "@/hooks/useAnimated";
import { hideAddTodoForm, hideUpdateTodoForm } from "@/store/actionForm/actionFormSlice";
import { AnimatePresence } from "framer-motion";
import AnimatedBlock from "@/components/molecules/AnimatedBlock/AnimatedBlock";
import ButtonIcon from "@/components/atoms/ButtonIcon/ButtonIcon";
import TodoFildInput from "@/components/atoms/TodoFilds/TodoFildInput";
import TodoFildTextarea from "@/components/atoms/TodoFilds/TodoFildTextarea";
import TodoFildDate from "@/components/atoms/TodoFilds/TodoFildDate";
import TodoFildTime from "@/components/atoms/TodoFilds/TodoFildTime";

const TodoForm = ({ mode }) => {
  const dispatch = useDispatch();
  const { createTodo, updateTodo } = todoThunks;

  
  const todoItem = useSelector(selectTodoCurrent);
  
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  
 const { date: initDate, time: initTime } = getNowDateTimeInZone();
  const [date, setDate] = useState(initDate);
  const [time, setTime] = useState(initTime);
  
  const [isDateTime, setIsDateTime] = useState(false);

  const isAddTodoVisible = useSelector(selectIsAddTodoForm);
  const isUpdateTodoVisible = useSelector(selectIsUpdateTodoForm);
  
  const isFormVisible = isAddTodoVisible || isUpdateTodoVisible;
  const { isOpen, requestClose, handleExitComplete } = useAnimated(
    isFormVisible,
    () => dispatch(isAddTodoVisible ? hideAddTodoForm() : hideUpdateTodoForm())
  );

  useEffect(() => {
    const setDefaults = (source) => {
      const { date, time } = source;
      setDate(date);
      setTime(time);
    };

    if (mode === 'update' && todoItem && isUpdateTodoVisible) {
      setTitle(todoItem.title || '');
      setDescription(todoItem.description || '');
      setDefaults(
        todoItem.end_date
          ? getDateTimeFromISO(todoItem.end_date)
          : getNowDateTimeInZone()
      );
    }

    if (mode === 'add' && isAddTodoVisible) {
      setTitle('');
      setDescription('');
      setDefaults(getNowDateTimeInZone());
    }
  }, [mode, todoItem, isAddTodoVisible, isUpdateTodoVisible]);

  const toggleDateTime = () => setIsDateTime((prev) => !prev);

  const handleSubmit = (e) => {
    e.preventDefault();

    let isoString = null;
    if (isDateTime) {
      isoString = new Date(`${date}T${time.length === 5 ? `${time}:00` : time}`).toISOString();
      console.log("isoString", isoString)
    }


    const data = {
      title,
      description,
      is_completed: false,
      end_date: isoString,
    };

    if (mode === "add") {
      dispatch(createTodo(data));
    } else if (mode === "update" && todoItem) {
      dispatch(updateTodo({ id: todoItem.id, data }));
    }

    requestClose()
    dispatch(clearTodoItem())
  };

  return (
    <AnimatePresence mode="wait" onExitComplete={handleExitComplete}>
      {isOpen && (
        <Modal>
          <AnimatedBlock key="profileForm" preset="slideUp">
            <div className={clsx(s["todo__form-wrap"])}>
              <div className={clsx(s["todo__form-title"], mode === "add" && s["title-add"], mode === "update" && s["title-update"] )}></div>
              <form className={clsx(s["todo__form"])} onSubmit={handleSubmit}>

                <TodoFildInput value={title} onChange={(e) => setTitle(e.target.value)} placeholder="" dataName="Title ToDo"/>

                <TodoFildTextarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="" dataName="Description ToDo"/>

                <TodoFildDate value={date} onChange={(e) => setDate(e.target.value)} isVisible={isDateTime} />

                <TodoFildTime value={time} onChange={(e) => setTime(e.target.value)} isVisible={isDateTime} step="1"/>

                <div className={clsx(s["todo__form__control"])}>
                  <ButtonIcon btnClass={clsx(s["btn-icon"])} handle={toggleDateTime}>
                    <IconBtnTimer  wrapClass={clsx(s["btn-icon__wrap"])} iconClass={clsx(s["btn-icon__icon"])}/>
                  </ButtonIcon>
                  <ButtonIcon btnClass={clsx(s["btn-icon"])} handle={requestClose}>
                    <IconBtnNotCompleted  wrapClass={clsx(s["btn-icon__wrap"])} iconClass={clsx(s["btn-icon__icon"])}/>
                  </ButtonIcon>
                  <ButtonIcon btnClass={clsx(s["btn-icon"])} type="submit">
                    <IconBtnSend wrapClass={clsx(s["btn-icon__wrap"])} iconClass={clsx(s["btn-icon__icon"])}/>
                  </ButtonIcon>
                </div>
              </form>
            </div>
          </AnimatedBlock>
        </Modal>
      )}
    </AnimatePresence>
  );
};

TodoForm.propTypes = {
    mode: PropTypes.string.isRequired
}

export default TodoForm;
