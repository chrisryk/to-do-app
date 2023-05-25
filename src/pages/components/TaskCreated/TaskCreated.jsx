import { useDispatch } from 'react-redux'
import { useState } from 'react'
import Checkbox from '../../../kit/components/Checkbox/Checkbox'
import Button from '../../../kit/components/Button/Button'
import Cross from '../../../kit/icons/Cross'
import styles from './TaskCreated.module.scss'

const TaskCreated = ({ task }) => {
    const [taskCompleted, setTaskCompleted] = useState(task.completed)
    const dispatch = useDispatch()
    const completeTaskHandler = () => {
        dispatch({type: 'COMPLETE_TASK', task: { completed: !taskCompleted, id: task.id }})
        setTaskCompleted(!taskCompleted)
    }

    const removeTaskHandler = () => {
        dispatch({type: 'REMOVE_TASK', task: { id: task.id}})
    }

    return (
        <div className={styles.listItem}>
            <Checkbox checked={taskCompleted} onCheckboxClickHandler={completeTaskHandler}/>
            <span>{task.description}</span>
            <Button onClickHandler={removeTaskHandler}>
                <Cross className={styles.closeIcon} />
            </Button>
        </div>
    )
}

export default TaskCreated