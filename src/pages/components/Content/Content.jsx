import Title from '../../../kit/components/Title/Title'
import Container from '../../../kit/components/Container/Container'
import TaskNew from '../TaskNew/TaskNew'
import TaskCreated from '../TaskCreated/TaskCreated'
import ListControls from '../ListControls/ListControls'
import { useSelector } from 'react-redux'
import styles from './Content.module.scss'

const Content = () => {
    const tasks = useSelector(state => state.tasks)

    return (
        <div className={styles.content}>
            <Title title={"Todo"} />
            <Container>
                <TaskNew />
            </Container>
            <Container>
                <div className={styles.todoListItems}>
                    {tasks.map(t => <TaskCreated checked={t.completed} taskDescription={t.description} />)}
                </div>
                <ListControls className={styles.listControls} />
            </Container>
            <span className={styles.todoListInfo}>Drag and drop to reorder list</span>
        </div>
    )
}

export default Content