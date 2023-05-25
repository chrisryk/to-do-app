import { useDispatch } from 'react-redux'
import { checkTask, removeTask } from '../../../slices/tasksSlice'
import Checkbox from '../../../kit/components/Checkbox/Checkbox'
import Button from '../../../kit/components/Button/Button'
import Cross from '../../../kit/icons/Cross'
import styles from './TaskCreated.module.scss'

const TaskCreated = ({ task }) => {
    const dispatch = useDispatch()
    const completeTaskHandler = () => {
        dispatch(checkTask({ completed: !task.completed, id: task.id }))
    }
    
    const removeTaskHandler = () => {
        dispatch(removeTask({ id: task.id}))
    }

    return (
        <div className={styles.listItem}>
            <Checkbox checked={task.completed} onCheckboxClickHandler={completeTaskHandler}/>
            <span className={styles.description}>{task.description}</span>
            <Button onClickHandler={removeTaskHandler}>
                <Cross className={styles.closeIcon} />
            </Button>
        </div>
    )
}

export default TaskCreated