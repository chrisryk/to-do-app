import PropTypes from 'prop-types';
import styles from './Button.module.scss';

function Button({
  title, textBold = false, textHighlight = false, onClickHandler, children,
}) {
  const textStyles = `${textBold && styles.textBold} ${textHighlight && styles.textHighlight}`;

  return (
    <button type="button" className={`${styles.button} ${textStyles}`} onClick={onClickHandler}>
      {title}
      {children}
    </button>
  );
}

Button.propTypes = {
  title: PropTypes.string.isRequired,
  textBold: PropTypes.bool.isRequired,
  textHighlight: PropTypes.bool.isRequired,
  onClickHandler: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default Button;
