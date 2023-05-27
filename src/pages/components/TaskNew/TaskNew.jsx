import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTask } from '../../../slices/tasksSlice';
import Checkbox from '../../../kit/components/Checkbox/Checkbox';
import styles from './TaskNew.module.scss';

function TaskNew() {
  const [taskDescription, setTaskDescription] = useState('');
  const [checkboxChecked, setCheckboxChecked] = useState(false);

  const dispatch = useDispatch();
  const addNewTaskHandler = () => {
    dispatch(addTask({ description: taskDescription, completed: checkboxChecked, deleted: false }));
  };

  const onChangeHandler = (event) => {
    setTaskDescription(event.target.value);
  };

  const onCheckboxClickHandler = () => {
    setCheckboxChecked(!checkboxChecked);
  };

  const keyDownHandler = (event) => {
    if (event.key === 'Enter' && taskDescription) {
      addNewTaskHandler();
      setTaskDescription('');
      setCheckboxChecked(false);
    }
  };

  return (
    <div className={styles.newItem}>
      <Checkbox checked={checkboxChecked} onCheckboxClickHandler={onCheckboxClickHandler} />
      <input type="text" placeholder="Add new task" value={taskDescription} className={styles.input} onKeyDown={keyDownHandler} onChange={onChangeHandler} />
    </div>
  );
}

export default TaskNew;