import { useDispatch, useSelector } from 'react-redux';
import { useState, useMemo } from 'react';
import { DragDropContext, Draggable } from 'react-beautiful-dnd';
import StrictModeDroppable from '../../../kit/components/StrictModeDroppable/StrictModeDroppable';
import { reorderTasks } from '../../../slices/tasksSlice';

import Title from '../../../kit/components/Title/Title';
import Container from '../../../kit/components/Container/Container';
import TaskNew from '../TaskNew/TaskNew';
import ListControls, { allButtonTitle, activeButtonTitle, completedButtonTitle } from '../ListControls/ListControls';
import styles from './Content.module.scss';
import TaskCreated from '../TaskCreated/TaskCreated';

const Content = () => {
  const tasks = useSelector((state) => state.tasksList.tasks.filter((t) => !t.deleted));

  const dispatch = useDispatch();
  const reorderTasksHandler = (newTaskIds) => {
    dispatch(reorderTasks(newTaskIds));
  };

  const [activeFilter, setActiveFilter] = useState(allButtonTitle);

  const tasksToDisplay = useMemo(() => {
    if (activeFilter === allButtonTitle) {
      return tasks;
    }
    if (activeFilter === activeButtonTitle) {
      return tasks.filter((t) => !t.completed);
    }
    if (activeFilter === completedButtonTitle) {
      return tasks.filter((t) => t.completed);
    }
    return [];
  }, [activeFilter, tasks]);

  const onDragEndHandler = (result) => {
    const { source, destination } = result;

    if (!destination || destination.index === source.index) {
      return;
    }

    reorderTasksHandler({ source, destination });
  };

  const tasksList = tasks.map((taskItem, index) => {
    const task = tasksToDisplay.find((t) => t.id === taskItem.id);
    return (
      task && (
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
      )
    );
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
          activeFilter={activeFilter}
          setActiveFilter={setActiveFilter}
          className={styles.listControls}
        />
      </Container>
      <span className={styles.reorderListInfo}>
        Drag and drop to reorder list
      </span>
    </div>
  );
};

export default Content;
