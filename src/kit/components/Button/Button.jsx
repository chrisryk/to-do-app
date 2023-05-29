import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './Button.module.scss';

const Button = ({
  title,
  textBold,
  textHighlight,
  onClickHandler,
  children,
  ...props
}) => {
  const textStyles = classNames(styles.button, {
    [styles.textBold]: textBold,
    [styles.textHighlight]: textHighlight,
  });

  return (
    <button
      type="button"
      className={textStyles}
      onClick={onClickHandler}
      {...props}
    >
      {title}
      {children}
    </button>
  );
};

Button.defaultProps = {
  title: '',
  textBold: false,
  textHighlight: false,
  children: undefined,
};

Button.propTypes = {
  title: PropTypes.string,
  textBold: PropTypes.bool,
  textHighlight: PropTypes.bool,
  onClickHandler: PropTypes.func.isRequired,
  children: PropTypes.node,
};

export default Button;
