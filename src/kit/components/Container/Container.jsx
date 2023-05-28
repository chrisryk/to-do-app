import PropTypes from 'prop-types';
import styles from './Container.module.scss';

const Container = ({ className, children }) => (
  <div className={`${styles.container} ${className}`}>{children}</div>
);

Container.defaultProps = {
  className: '',
  children: undefined,
};

Container.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};

export default Container;
