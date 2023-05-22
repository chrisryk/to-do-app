import { useDispatch } from 'react-redux'
import { useState } from 'react'
import Checkbox from '../../../kit/components/Checkbox/Checkbox'
import styles from './TaskCreated.module.scss'

const TaskCreated = ({ task }) => {
    const [taskCompleted, setTaskCompleted] = useState(task.completed)
    const dispatch = useDispatch()
    const completeTaskHandler = () => {
        dispatch({type: 'COMPLETE_TASK', task: { completed: !taskCompleted, id: task.id }})
        setTaskCompleted(!taskCompleted)
    }

    return (
        <div className={styles.listItem}>
            <Checkbox checked={taskCompleted} onCheckboxClickHandler={completeTaskHandler}/>
            <span>{task.description}</span>
        </div>
    )
}

export default TaskCreated