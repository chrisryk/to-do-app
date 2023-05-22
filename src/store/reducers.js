const initialState = {
  tasks: [],
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

      return {
        ...state,
        tasks: [...state.tasks, newTask],
        nextId: state.nextId + 1
      }
    case 'REMOVE_TASK':
      return {
        ...state,
        tasks: state.tasks.filter(task => task.id !== action.task.id)
      }
    case 'COMPLETE_TASK':
      return {
        ...state,
        tasks: state.tasks.map(task => {
          if (task.id === action.task.id) {
            return {
              ...task,
              completed: !task.completed
            };
          }
          return task;
        })
      }
    default:
      return state
  }
}

export default rootReducer