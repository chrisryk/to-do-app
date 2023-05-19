import { useState } from 'react';
import Tick from '../../icons/Tick'
import styles from './Checkbox.module.scss'

const Checkbox = ({ checkboxChecked, className }) => {
    const [checked, setChecked] = useState(checkboxChecked);
    const onClickHandler = () => {
        setChecked(prev => !prev)
    }

    return (
        <button className={`${styles.checkbox} ${checked && styles.checked} ${className}`} onClick={onClickHandler}>
            {checked && <Tick className={styles.icon} />}
        </button>
    )
}

export default Checkbox