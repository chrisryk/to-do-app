import { useSelector } from 'react-redux'
import styles from './ListControls.module.scss'

const ListControls = ({className}) => {
    const tasks = useSelector(state => state.tasks)
    const activeTasksCount = tasks.filter(task => !task.completed).length

    return (
        <div className={styles.container + ` ${className}`}>
            <span>{activeTasksCount} item{activeTasksCount > 1 && 's'} left</span>
            <button>All</button>
            <button>Active</button>
            <button>Completed</button>
            <button>Clear Completed</button>
        </div>
    )
}

export default ListControls