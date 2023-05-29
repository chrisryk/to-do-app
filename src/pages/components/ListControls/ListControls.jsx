import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { clearCompletedTasks } from '../../../slices/tasksSlice';
import Button from '../../../kit/components/Button/Button';
import styles from './ListControls.module.scss';

const ListControls = ({
  tasks, buttonsActivity: { all, active, completed }, setButtonsActivity, className,
}) => {
  const listControlsStyles = classNames(styles.container, {
    [className]: className,
  });

  const activeTasksCount = tasks.filter((task) => !task.completed).length;
  const dispatch = useDispatch();
  const clearCompletedTasksHandler = () => {
    dispatch(clearCompletedTasks());
  };

  const buttonData = [
    {
      title: 'All',
      isActive: all,
      onClick: () => setButtonsActivity({ all: true, active: false, completed: false }),
    },
    {
      title: 'Active',
      isActive: active,
      onClick: () => setButtonsActivity({ all: false, active: true, completed: false }),
    },
    {
      title: 'Completed',
      isActive: completed,
      onClick: () => setButtonsActivity({ all: false, active: false, completed: true }),
    },
    {
      title: 'Clear Completed',
      onClick: () => clearCompletedTasksHandler(),
    },
  ];

  return (
    <div className={listControlsStyles}>
      <span className={styles.info}>
        {activeTasksCount ? `${activeTasksCount} item${activeTasksCount > 1 ? 's' : ''}` : 'No tasks'}
        {' '}
        left
      </span>
      <div className={styles.buttonContainer}>
        {buttonData.map(({ title, isActive, onClick }) => (
          <Button
            key={title}
            title={title}
            textBold
            textHighlight={isActive}
            onClickHandler={onClick}
          />
        ))}
      </div>
    </div>
  );
};

ListControls.defaultProps = {
  className: '',
};

ListControls.propTypes = {
  tasks: PropTypes.arrayOf(PropTypes.shape({
    completed: PropTypes.bool.isRequired,
  })).isRequired,
  buttonsActivity: PropTypes.shape({
    all: PropTypes.bool.isRequired,
    active: PropTypes.bool.isRequired,
    completed: PropTypes.bool.isRequired,
  }).isRequired,
  setButtonsActivity: PropTypes.func.isRequired,
  className: PropTypes.string,
};

export default ListControls;
