import PropTypes from 'prop-types';
import classNames from 'classnames';
import Tick from '../../icons/Tick';
import styles from './Checkbox.module.scss';

const Checkbox = ({
  checked, id, onCheckboxClickHandler, className, ...props
}) => {
  const checkboxStyles = classNames(styles.checkbox, {
    [styles.checked]: checked,
    [className]: className,
  });

  return (
    <label className={checkboxStyles} htmlFor={id}>
      <input
        id={id}
        type="checkbox"
        onChange={onCheckboxClickHandler}
        checked={checked}
        className={styles.hidden}
        {...props}
      />
      {checked && <Tick className={styles.icon} />}
    </label>
  );
};

Checkbox.defaultProps = {
  className: '',
  id: '',
};

Checkbox.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  checked: PropTypes.bool.isRequired,
  onCheckboxClickHandler: PropTypes.func.isRequired,
  className: PropTypes.string,
};

export default Checkbox;
