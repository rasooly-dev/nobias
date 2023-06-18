import styles from './Spectrum.module.css'

import { useRef, useEffect, useState } from 'react'

const Spectrum = ({ val } : { val: number }) => {

    const spectrumRef = useRef<HTMLDivElement>(null)
    const [thumbPosition, setThumbPosition] = useState<number>(0)

    useEffect(() => {
        if (spectrumRef.current)
            setThumbPosition(( val / 200 ) * spectrumRef.current.offsetWidth)
    }, [val])

    return (
        <>
        <div className={styles.spectrum} ref={spectrumRef}>
            <div className={styles.left} />
            <div className={styles.thumb} style={{
                transform: `translateX(${thumbPosition}px)`
            }}/>
            <div className={styles.right} />
        </div>
        <div className={styles.labels}>
            <p>Left</p>
            <p>Right</p>
        </div>
        </>
    )
}

export default Spectrum