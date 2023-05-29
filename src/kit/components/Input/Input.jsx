import PropTypes from 'prop-types';
import styles from './Input.module.scss';

const Input = ({
  placeholder, value, onKeyDown, onChange, type,
}) => (
  <input
    placeholder={placeholder}
    value={value}
    className={styles.input}
    onKeyDown={onKeyDown}
    onChange={onChange}
    type={type}
  />
);

Input.defaultProps = {
  placeholder: '',
  value: '',
  type: 'text',
};

Input.propTypes = {
  placeholder: PropTypes.string,
  value: PropTypes.string,
  type: PropTypes.string,
  onKeyDown: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Input;
