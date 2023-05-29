import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { clearCompletedTasks } from '../../../slices/tasksSlice';
import Button from '../../../kit/components/Button/Button';
import styles from './ListControls.module.scss';

const allButtonTitle = 'All';
const activeButtonTitle = 'Active';
const completedButtonTitle = 'Completed';

const ListControls = ({
  tasks, activeFilter, setActiveFilter, className,
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
      title: allButtonTitle,
      isActive: activeFilter === allButtonTitle,
      onClick: () => setActiveFilter(allButtonTitle),
    },
    {
      title: activeButtonTitle,
      isActive: activeFilter === activeButtonTitle,
      onClick: () => setActiveFilter(activeButtonTitle),
    },
    {
      title: completedButtonTitle,
      isActive: activeFilter === completedButtonTitle,
      onClick: () => setActiveFilter(completedButtonTitle),
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
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      completed: PropTypes.bool.isRequired,
    }),
  ).isRequired,
  activeFilter: PropTypes.string.isRequired,
  setActiveFilter: PropTypes.func.isRequired,
  className: PropTypes.string,
};

export { allButtonTitle, activeButtonTitle, completedButtonTitle };
export default ListControls;
