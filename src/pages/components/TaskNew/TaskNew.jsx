import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTask } from '../../../slices/tasksSlice';
import Checkbox from '../../../kit/components/Checkbox/Checkbox';
import Button from '../../../kit/components/Button/Button';
import Input from '../../../kit/components/Input/Input';
import Cross from '../../../kit/icons/Cross';
import styles from './TaskNew.module.scss';

const TaskNew = () => {
  const [taskDescription, setTaskDescription] = useState('');
  const [checkboxChecked, setCheckboxChecked] = useState(false);

  const dispatch = useDispatch();
  const addNewTaskHandler = () => {
    if (taskDescription) {
      dispatch(
        addTask({
          description: taskDescription,
          completed: checkboxChecked,
          deleted: false,
        }),
      );
      setTaskDescription('');
      setCheckboxChecked(false);
    }
  };

  const onChangeHandler = (event) => {
    setTaskDescription(event.target.value);
  };

  const onCheckboxClickHandler = () => {
    setCheckboxChecked(!checkboxChecked);
  };

  const keyDownHandler = (event) => {
    if (event.key === 'Enter') {
      addNewTaskHandler();
    }
  };

  return (
    <div className={styles.newItem}>
      <Checkbox
        checked={checkboxChecked}
        id="new-task"
        onCheckboxClickHandler={onCheckboxClickHandler}
      />
      <Input
        placeholder="Add new task"
        value={taskDescription}
        onKeyDown={keyDownHandler}
        onChange={onChangeHandler}
      />
      <Button onClickHandler={addNewTaskHandler}>
        <Cross className={styles.addIcon} />
      </Button>
    </div>
  );
};

export default TaskNew;
