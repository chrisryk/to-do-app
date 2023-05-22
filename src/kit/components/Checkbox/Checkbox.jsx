import Tick from '../../icons/Tick'
import styles from './Checkbox.module.scss'

const Checkbox = ({ checked, onCheckboxClickHandler, className }) => {
    return (
        <button className={`${styles.checkbox} ${checked && styles.checked} ${className}`} onClick={onCheckboxClickHandler}>
            {checked && <Tick className={styles.icon} />}
        </button>
    )
}

export default Checkbox