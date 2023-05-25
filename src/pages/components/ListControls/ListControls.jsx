import { useDispatch } from 'react-redux'
import { clearCompletedTasks } from '../../../slices/tasksSlice'
import Button from '../../../kit/components/Button/Button'
import styles from './ListControls.module.scss'

const ListControls = ({tasks, buttonsActivity, setButtonsActivity, className}) => {
    const activeTasksCount = tasks.filter(task => !task.completed).length
    const dispatch = useDispatch()
    const clearCompletedTasksHandler = () => {
        dispatch(clearCompletedTasks())
    }

    const allButtonClickHandler = () => {
        setButtonsActivity(() => ({
            all: true,
            active: false,
            completed: false,
        }))
    }

    const activeButtonClickHandler = () => {
        setButtonsActivity(() => ({
            all: false,
            active: true,
            completed: false,
        }))
    }

    const completedButtonClickHandler = () => {
        setButtonsActivity(() => ({
            all: false,
            active: false,
            completed: true,
        }))
    }


    return (
        <div className={styles.container + ` ${className}`}>
            <span className={styles.info}>{activeTasksCount ? `${activeTasksCount} item${activeTasksCount > 1 ? 's' : ''}` : "No tasks"} left</span>
            <div className={styles.buttonContainer}>
                <Button title={"All"} textBold textHighlight={buttonsActivity.all} onClickHandler={allButtonClickHandler}/>
                <Button title={"Active"} textBold textHighlight={buttonsActivity.active} onClickHandler={activeButtonClickHandler}/>
                <Button title={"Completed"} textBold textHighlight={buttonsActivity.completed} onClickHandler={completedButtonClickHandler}/>
                <Button title={"Clear Completed"} textBold onClickHandler={clearCompletedTasksHandler} />
            </div>
        </div>
    )
}

export default ListControls