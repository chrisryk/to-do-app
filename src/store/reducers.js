const initialState = {
    tasks: [
        { id: 1, description: 'Task 1', completed: false },
        { id: 2, description: 'Task 2', completed: true },
    ]
}

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_TASK':
            return {
                ...state,
                tasks: [...state.tasks, action.task]
            }
        case 'REMOVE_TASK':
            return {
                ...state,
                task: state.tasks.filter(task => task.id !== action.taskId)
            }
        default:
            return state
    }
}

export default rootReducer