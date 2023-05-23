import styles from './Button.module.scss'

const Button = ({ title, textBold, textHighlight, onClickHandler }) => {
    const textStyles = `${textBold && styles.textBold} ${textHighlight && styles.textHighlight}`

    return (
        <button className={`${styles.button} ${textStyles}`} onClick={onClickHandler}>{title}</button>
    )
}

export default Button