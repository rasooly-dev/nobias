import styles from './RangeBar.module.css'

import { useRef, useEffect, useState } from 'react'

const RangeBar = ({ label, val } : { label: string, val: number }) => {

    const rangeBarRef = useRef<HTMLDivElement>(null)

    const [tabWidth, setTabWidth] = useState<number>(0)

    useEffect(() => {
        if (rangeBarRef.current)
            setTabWidth(( val / 100 ) * rangeBarRef.current.offsetWidth)
    }, [val])
    
    return (
        <div className={styles.rangeBarContainer}>
            <div className={styles.label}>
                <pre>{label}</pre>
            </div>

            <div className={styles.rangeBar} ref={rangeBarRef}>
                <div className={styles.tab} style={{
                    width: `${tabWidth}px`
                }}/>
            </div>

        </div>
    )
}

export default RangeBar

