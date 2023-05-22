import { useState } from 'react'
import { useDispatch } from 'react-redux'
import Checkbox from '../../../kit/components/Checkbox/Checkbox'
import styles from './TaskNew.module.scss'

const TaskNew = () => {
    const [taskDescription, setTaskDescription] = useState()

    const dispatch = useDispatch()
    const addNewTaskHandler = () => {
        dispatch({type: 'ADD_TASK', task: { description: taskDescription, completed: false }})
    }

    const onChangeHandler = (event) => {
        setTaskDescription(event.target.value)
    }

    const keyDownHandler = (event) => {
        if (event.key === 'Enter' && taskDescription) {
            addNewTaskHandler()
            setTaskDescription('')
        }
    }

    return (
        <div className={styles.newItem}>
            <Checkbox checkboxChecked={false} onCheckboxClickHandler={() => {}} />
            <input type="text" placeholder="Add new task" value={taskDescription} className={styles.input} onKeyDown={keyDownHandler} onChange={onChangeHandler}/>
        </div>
    )
}

export default TaskNew