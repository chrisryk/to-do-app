import styles from './Button.module.scss'

const Button = ({ title, textBold, textHighlight, onClickHandler, children }) => {
    const textStyles = `${textBold && styles.textBold} ${textHighlight && styles.textHighlight}`

    return (
        <button className={`${styles.button} ${textStyles}`} onClick={onClickHandler}>{title}{children}</button>
    )
}

export default Button