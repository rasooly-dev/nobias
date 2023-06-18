import styles from './ContrastingBar.module.css'

const ContrastingBar = ({ val } : { val: number }) => {

    return (
        <div className={styles.contrastingBarContainer}>
            <div className={styles.labels}>
                <p>Positive</p>
                <p>Negative</p>
            </div>
            <div className={styles.contrastingBar}>
                <div className={styles.positive} style={{
                    height: `calc(${(val / 100)} * 100%)`
                }}/>
                <div 
                className={styles.negative}
                style={{
                    height: `calc(${(100 - val) / 100} * 100%)`
                }}/>
            </div>
        </div>

    )
}

export default ContrastingBar