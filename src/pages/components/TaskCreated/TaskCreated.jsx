import Checkbox from '../../../kit/components/Checkbox/Checkbox'
import styles from './TaskCreated.module.scss'

const TaskCreated = ({taskDescription, checked}) => {
    return (
        <div className={styles.listItem}>
            <Checkbox checkboxChecked={checked} />
            <span>{taskDescription}</span>
        </div>
    )
}

export default TaskCreated