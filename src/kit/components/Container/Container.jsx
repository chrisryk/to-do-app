import PropTypes from 'prop-types';
import styles from './Container.module.scss';

function Container({ className, children }) {
  return <div className={`${styles.container} ${className}`}>{children}</div>;
}

Container.propTypes = {
  className: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
};

export default Container;
