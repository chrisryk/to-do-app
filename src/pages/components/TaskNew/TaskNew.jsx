import { useDispatch } from 'react-redux'
import Checkbox from '../../../kit/components/Checkbox/Checkbox'
import styles from './TaskNew.module.scss'

const TaskNew = () => {
    const dispatch = useDispatch()
    const addNewTaskHandler = () => {
        dispatch({type: 'ADD_TASK', task: { id: 3, description: 'Nowe zadanie' }})
    }
    const keyDownHandler = (event) => {
        event.key === 'Enter' && addNewTaskHandler()
    }

    return (
        <div className={styles.newItem}>
            <Checkbox checkboxChecked={false} />
            <input type="text" placeholder="Add new task" className={styles.input} onKeyDown={keyDownHandler}/>
        </div>
    )
}

export default TaskNew