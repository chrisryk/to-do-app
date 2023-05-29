import PropTypes from 'prop-types';
import Tick from '../../icons/Tick';
import styles from './Checkbox.module.scss';

const Checkbox = ({
  checked, onCheckboxClickHandler, className, ...props
}) => (
  <button
    type="button"
    className={`${styles.checkbox} ${checked && styles.checked} ${className}`}
    onClick={onCheckboxClickHandler}
    {...props}
  >
    {checked && <Tick className={styles.icon} data-testid="icon" />}
  </button>
);

Checkbox.defaultProps = {
  className: '',
};

Checkbox.propTypes = {
  checked: PropTypes.bool.isRequired,
  onCheckboxClickHandler: PropTypes.func.isRequired,
  className: PropTypes.string,
};

export default Checkbox;
