const saveTasksToLocalStorage = (tasks) => {
  localStorage.setItem('tasks', JSON.stringify(tasks));
};

const getTasksFromLocalStorage = () => {
  const tasks = localStorage.getItem('tasks');
  return tasks ? JSON.parse(tasks) : [];
};

const initialState = {
  tasks: getTasksFromLocalStorage(),
  nextId: 1,
}

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_TASK':
      const newTask = {
        id: state.nextId,
        description: action.task.description,
        completed: action.task.completed
      }

      const tasksAfterAdd = [...state.tasks, newTask]
      saveTasksToLocalStorage(tasksAfterAdd)
      
      return {
        ...state,
        tasks: tasksAfterAdd,
        nextId: state.nextId + 1
      }
      case 'REMOVE_TASK':
      const tasksAfterRemove = state.tasks.filter(task => task.id !== action.task.id)
      saveTasksToLocalStorage(tasksAfterRemove)
      
      return {
        ...state,
        tasks: tasksAfterRemove
      }
    case 'COMPLETE_TASK':
      const tasksAfterUpdate = state.tasks.map(task => {
        if (task.id === action.task.id) {
          return {
            ...task,
            completed: !task.completed
          };
        }
        return task;
      })
      saveTasksToLocalStorage(tasksAfterUpdate)
      
      return {
        ...state,
        tasks: tasksAfterUpdate
      }
    default:
      return state
  }
}

export default rootReducer