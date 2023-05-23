import { useSelector } from 'react-redux'
import { useState } from 'react'
import { useEffect } from 'react'
import Title from '../../../kit/components/Title/Title'
import Container from '../../../kit/components/Container/Container'
import TaskNew from '../TaskNew/TaskNew'
import TaskCreated from '../TaskCreated/TaskCreated'
import ListControls from '../ListControls/ListControls'
import styles from './Content.module.scss'

const Content = () => {
    const tasks = useSelector(state => state.tasks)
    const [tasksToDisplay, setTasksToDisplay] = useState(tasks)
    const [buttonsActivity, setButtonsActivity] = useState({
        all: true,
        active: false,
        completed: false,
    })

    useEffect(() => {
        if (buttonsActivity.all) {
            setTasksToDisplay(tasks)
        } else if (buttonsActivity.active) {
            setTasksToDisplay(tasks.filter(t => !t.completed))
        } else if (buttonsActivity.completed) {
            setTasksToDisplay(tasks.filter(t => t.completed))
        }
    }, [buttonsActivity, tasks])

    return (
        <div className={styles.content}>
            <Title title={"Todo"} />
            <Container>
                <TaskNew />
            </Container>
            <Container>
                <div className={styles.todoListItems}>
                    {tasksToDisplay.map(t => <TaskCreated task={t}  key={t.id}/>)}
                </div>
                <ListControls buttonsActivity={buttonsActivity} setButtonsActivity={setButtonsActivity} className={styles.listControls} />
            </Container>
            <span className={styles.reorderListInfo}>Drag and drop to reorder list</span>
        </div>
    )
}

export default Content