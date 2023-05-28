import PropTypes from 'prop-types';
import styles from './Button.module.scss';

const Button = ({
  title, textBold, textHighlight, onClickHandler, children,
}) => {
  const textStyles = `${textBold && styles.textBold} ${textHighlight && styles.textHighlight}`;

  return (
    <button type="button" className={`${styles.button} ${textStyles}`} onClick={onClickHandler}>
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
