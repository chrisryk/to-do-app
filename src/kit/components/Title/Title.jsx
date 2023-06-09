import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './Title.module.scss';

const Title = ({ title }) => <h1 className={classNames(styles.title)}>{title}</h1>;

Title.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Title;
