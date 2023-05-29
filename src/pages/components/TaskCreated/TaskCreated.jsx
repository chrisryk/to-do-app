import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { checkTask, removeTask } from '../../../slices/tasksSlice';
import Checkbox from '../../../kit/components/Checkbox/Checkbox';
import Button from '../../../kit/components/Button/Button';
import Cross from '../../../kit/icons/Cross';
import styles from './TaskCreated.module.scss';

const TaskCreated = ({ task }) => {
  const dispatch = useDispatch();
  const completeTaskHandler = () => {
    dispatch(checkTask({ completed: !task.completed, id: task.id }));
  };

  const removeTaskHandler = () => {
    dispatch(removeTask({ id: task.id }));
  };

  const descriptionStyles = classNames(styles.description, {
    [styles.completed]: task.completed,
  });

  return (
    <div className={styles.listItem}>
      <Checkbox
        checked={task.completed}
        id={task.id}
        onCheckboxClickHandler={completeTaskHandler}
        data-testid="task-checkbox"
      />
      <span className={descriptionStyles}>{task.description}</span>
      <Button onClickHandler={removeTaskHandler} data-testid="task-remove-button">
        <Cross className={styles.closeIcon} />
      </Button>
    </div>
  );
};

TaskCreated.propTypes = {
  task: PropTypes.shape({
    completed: PropTypes.bool.isRequired,
    description: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
  }).isRequired,
};

export default TaskCreated;
