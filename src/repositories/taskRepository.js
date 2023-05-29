const saveTasks = (state) => {
  localStorage.setItem('tasks', JSON.stringify(state.tasks));
};

const loadTasks = () => {
  const tasks = localStorage.getItem('tasks');
  return tasks ? JSON.parse(tasks) : [];
};

export { saveTasks, loadTasks };
