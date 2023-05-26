import PropTypes from 'prop-types';
import Tick from '../../icons/Tick';
import styles from './Checkbox.module.scss';

function Checkbox({ checked, onCheckboxClickHandler, className }) {
  return (
    <button type="button" className={`${styles.checkbox} ${checked && styles.checked} ${className}`} onClick={onCheckboxClickHandler}>
      {checked && <Tick className={styles.icon} />}
    </button>
  );
}

Checkbox.propTypes = {
  checked: PropTypes.bool.isRequired,
  onCheckboxClickHandler: PropTypes.func.isRequired,
  className: PropTypes.string.isRequired,
};

export default Checkbox;
