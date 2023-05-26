import { useDispatch, useSelector } from 'react-redux';
import { useState, useMemo } from 'react';
import { DragDropContext, Draggable } from 'react-beautiful-dnd';
import StrictModeDroppable from './components/StrictModeDroppable/StrictModeDroppable';
import { reorderTasks } from '../../../slices/tasksSlice';

import Title from '../../../kit/components/Title/Title';
import Container from '../../../kit/components/Container/Container';
import TaskNew from '../TaskNew/TaskNew';
import ListControls from '../ListControls/ListControls';
import styles from './Content.module.scss';
import TaskCreated from '../TaskCreated/TaskCreated';

function Content() {
  const tasks = useSelector((state) => state.tasksList.tasks.filter((t) => !t.deleted));
  const tasksOrder = useSelector((state) => state.tasksList.tasksOrder);

  const dispatch = useDispatch();
  const reorderTasksHandler = ((newTaskIds) => {
    dispatch(reorderTasks(newTaskIds));
  });

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

  const onDragEndHandler = (result) => {
    const { source, destination } = result;

    if (!destination || destination.index === source.index) {
      return;
    }

    reorderTasksHandler({ source, destination });
  };

  const tasksList = tasksOrder.map((taskId, index) => {
    const task = tasksToDisplay.find((t) => t.id === taskId);
    return (
      task
      && (
        <Draggable draggableId={task.id} index={index} key={task.id}>
          {(provided) => (
            <div
              className={styles.listItem}
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              key={task.id}
            >
              <TaskCreated task={task} />
            </div>
          )}
        </Draggable>
      ));
  });

  return (
    <div className={styles.content}>
      <Title title="Todo" />
      <Container>
        <TaskNew />
      </Container>
      <Container>
        <DragDropContext onDragEnd={onDragEndHandler}>
          <StrictModeDroppable droppableId="tasksList">
            {(provided) => (
              <div
                className={styles.todoListItems}
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {tasksList}
                {provided.placeholder}
              </div>
            )}
          </StrictModeDroppable>
        </DragDropContext>
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
