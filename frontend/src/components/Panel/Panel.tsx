import styles from './Panel.module.css'

const Panel = ({ children, style } : { children: React.ReactNode, style: any }) => {
    return (
        <div className={styles.panel} style={{ ...style }}>
            {children}
        </div>
    )
}

// interface PanelProps {
//     score: number
//     title: string
//     summary: string
//     politicalAffiliation: number // -100 to 100 (left to right)
//     emotionalData: Array<{emotion: string, percentage: number}>
//     indepthAnalysis: string
// }

export default Panel