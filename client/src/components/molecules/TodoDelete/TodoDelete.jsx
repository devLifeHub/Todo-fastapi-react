import Modal from "@/components/atoms/Modal/Modal";
import todoThunks from "@/store/todo/todoThunks";
import clsx from "clsx";
import { useDispatch, useSelector } from "react-redux";
import s from "./TodoDelete.module.scss";
import PropTypes from "prop-types";
import Button from "@/components/atoms/Button/Button";
import { selectTodoCurrent } from "@/store/todo/todoSelectors";
import { clearTodoItem } from "@/store/todo/todoSlice";
import { selectIsDeleteTodo} from "@/store/actionForm/actionFormSelectors";
import { useAnimatedForm } from "@/hooks/useAnimatedForm";

const TodoDelete = () => {
  const dispatch = useDispatch();
  const { deleteTodo } = todoThunks;
  const todoItem = useSelector(selectTodoCurrent);
  const isDeleteTodo = useSelector(selectIsDeleteTodo)
  const { isAnimate, handleClose, handleSubmitClose } = useAnimatedForm(isDeleteTodo);

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(deleteTodo(todoItem.id))
    handleSubmitClose()
    dispatch(clearTodoItem())
  };

  return (
    <Modal>
      <div className={clsx(s["todo__form-wrap"], isAnimate && s["animate"])}>
        <div className={clsx(s["todo__form-title"])}></div>
        <div className={clsx(s["todo__form"])} >
            <p className={clsx(s["todo__form-descr"])}>Are you sure you want to delete ToDo?</p>
          <div className={clsx(s["todo__form__control"])}>
            <Button name="Yes!" onClick={handleSubmit} type="button"/>
            <Button name="No!" onClick={handleClose} type="button"/>
          </div>
        </div>
      </div>
    </Modal>
  );
};

TodoDelete.propTypes = {
    mode: PropTypes.string.isRequired
}

export default TodoDelete;
