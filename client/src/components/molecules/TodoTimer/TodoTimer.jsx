import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import clsx from 'clsx';
import s from "./TodoTimer.module.scss";
import { selectTodoById } from '@/store/todo/todoSelectors';
import todoThunks from '@/store/todo/todoThunks';

const TodoTimer = ({ todoId }) => {
  const todo = useSelector(state => selectTodoById(state, todoId));
  const { patchTodo } = todoThunks;
  const dispatch = useDispatch()
  const endDate = todo?.end_date;
  const isCompleted = todo?.is_completed;

  const dateObj = new Date(endDate);
  const [diffString, setDiffString] = useState('');
  const [isZeroTimer, setIsZeroTimer] = useState(false);
  const [isCritical, setIsCritical] = useState(false);

  const calcDiff = () => {
    const now = new Date();
    const diffMs = dateObj - now;
    const totalSeconds = Math.max(Math.floor(diffMs / 1000), 0);

    const days = Math.floor(totalSeconds / (60 * 60 * 24));
    const hours = Math.floor((totalSeconds % (60 * 60 * 24)) / (60 * 60));
    const minutes = Math.floor((totalSeconds % (60 * 60)) / 60);
    const seconds = totalSeconds % 60;

    return {
      string: `${days} d: ${hours} h: ${minutes} m: ${seconds} s`,
      isZero: totalSeconds === 0,
      isCritical: totalSeconds <= 300 && totalSeconds > 0
    };
  };

  useEffect(() => {
    if (!endDate || isCompleted) return;
    dispatch(patchTodo({ id: todo.id, data: { is_completed: false, is_fail: false }}))

    let timer;

    const updateTimer = () => {
      const { string, isZero, isCritical } = calcDiff();
      setDiffString(string);
      setIsZeroTimer(isZero);
      setIsCritical(isCritical);

      if (isZero) {
        dispatch(patchTodo({ id: todo.id, data: { is_completed: false, is_fail: true }}))
        clearInterval(timer);
      } 
    };

    updateTimer();
    timer = setInterval(updateTimer, 1000);

    return () => clearInterval(timer);
  }, [endDate, isCompleted]);

  if (!endDate) return null;
  if (isNaN(dateObj)) return <p>Invalid date</p>;

  return (
    <div className={clsx(
      s["timer__content"],
      isZeroTimer && s["timer--fail"],
      isCritical && s["timer--critical"]
    )}>
      <p>{diffString}</p>
    </div>
  );
};

TodoTimer.propTypes = {
  todoId: PropTypes.number,
};

export default TodoTimer;
