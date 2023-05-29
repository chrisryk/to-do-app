import PropTypes from 'prop-types';
import classNames from 'classnames';
import Tick from '../../icons/Tick';
import styles from './Checkbox.module.scss';

const Checkbox = ({ checked, onCheckboxClickHandler, className }) => {
  const checkboxStyles = classNames(styles.checkbox, {
    [styles.checked]: checked,
    [className]: className,
  });

  return (
    <button
      type="button"
      className={checkboxStyles}
      onClick={onCheckboxClickHandler}
    >
      {checked && <Tick className={styles.icon} />}
    </button>
  );
};

Checkbox.defaultProps = {
  className: '',
};

Checkbox.propTypes = {
  checked: PropTypes.bool.isRequired,
  onCheckboxClickHandler: PropTypes.func.isRequired,
  className: PropTypes.string,
};

export default Checkbox;
