import { useSelector } from 'react-redux';
import { useState, useMemo } from 'react';

import Title from '../../../kit/components/Title/Title';
import Container from '../../../kit/components/Container/Container';
import TaskNew from '../TaskNew/TaskNew';
import TaskCreated from '../TaskCreated/TaskCreated';
import ListControls from '../ListControls/ListControls';
import styles from './Content.module.scss';

function Content() {
  const tasks = useSelector((state) => state.tasks.filter((t) => !t.deleted));
  const [buttonsActivity, setButtonsActivity] = useState({
    all: true,
    active: false,
    completed: false,
  });

  const tasksToDisplay = useMemo(() => {
    if (buttonsActivity.all) {
      return tasks;
    }
    if (buttonsActivity.active) {
      return tasks.filter((t) => !t.completed);
    }
    if (buttonsActivity.completed) {
      return tasks.filter((t) => t.completed);
    }
    return [];
  }, [buttonsActivity, tasks]);

  return (
    <div className={styles.content}>
      <Title title="Todo" />
      <Container>
        <TaskNew />
      </Container>
      <Container>
        <div className={styles.todoListItems}>
          {tasksToDisplay.map((t) => <TaskCreated task={t} key={t.id} />)}
        </div>
        <ListControls
          tasks={tasks}
          buttonsActivity={buttonsActivity}
          setButtonsActivity={setButtonsActivity}
          className={styles.listControls}
        />
      </Container>
      <span className={styles.reorderListInfo}>Drag and drop to reorder list</span>
    </div>
  );
}

export default Content;
