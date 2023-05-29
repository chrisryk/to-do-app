import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './Container.module.scss';

const Container = ({ className, children }) => {
  const containerStyles = classNames(styles.container, {
    [className]: className,
  });

  return <div className={containerStyles}>{children}</div>;
};

Container.defaultProps = {
  className: '',
  children: undefined,
};

Container.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};

export default Container;
