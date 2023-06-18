import styles from './Landing.module.css'

import { useState, useEffect } from 'react'

import Panel from '../components/Panel/Panel'

import Spectrum from '../components/Spectrum/Spectrum'
import RangeBar from '../components/RangeBar/RangeBar'
import ContrastingBar from '../components/ContrastingBar/ContrastingBar'

const Landing = () => {

    const [text, setText] = useState<string>('')

    const [loading, setLoading] = useState<boolean>(false)
    const [results, setResults] = useState<any>(null)

    const handleSubmit = () => {
        console.log(text)
        setLoading(true)

        setTimeout(() => {
            setResults({
                    score: 7.5,
                    title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
                    summary: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Nullam euismod, nisl eget aliquam ultricies, nunc nisl
                        ultricies nunc, quis ultricies nisl nunc eget nisl.
                        Suspendisse potenti. Nulla facilisi. Nulla facilisi.
                        Nulla facilisi. Nulla facilisi. Nulla facilisi. Nulla
                        facilisi. Nulla facilisi. Nulla facilisi. Nulla facilisi.`,
                    politicalAffiliation: 50, // -100 to 100 (left to right)
                    emotionalData: [
                        {
                            emotion: 'Anger',
                            percentage: 0.5
                        },
                        {
                            emotion: 'Joy',
                            percentage: 0.3
                        },
                        {
                            emotion: 'Sadness',
                            percentage: 0.2
                        }
                    ],
                    indepthAnalysis: `The author of the article wrote with emotion using words like "Ipsum" and "Dolor".
                        This is a clear indication of bias. The author of the article wrote with emotion using words like "Ipsum" and "Dolor".
                        This is a clear indication of bias. The author of the article wrote with emotion using words like "Ipsum" and "Dolor".
                        Make sure to look out for the use of these words in the future.`,
                    otherPerspective: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                        Nullam euismod, nisl eget aliquam ultricies, nunc nisl ultricies nunc,
                        quis ultricies nisl nunc eget nisl. Suspendisse potenti. Nulla facilisi.
                        Nulla facilisi. Nulla facilisi. Nulla facilisi. Nulla facilisi. Nulla
                        facilisi. Nulla facilisi. Nulla facilisi. Nulla facilisi. Nulla facilisi.
                        Nulla facilisi. Nulla facilisi. Nulla facilisi. Nulla facilisi. Nulla
                        facilisi. Nulla facilisi. Nulla facilisi. Nulla facilisi. Nulla facilisi.`,
                    
                    positivePercentage: 50 // 0 to 100
                }
            )
            setLoading(false)
        }, 10000)
    }

    if (loading) {
        return <Loading />
    }

    return (
        <div className={`${styles.page} page`}>
            <header>
                <Logo />
                <div className={styles.info}>
                    <h1>nobias</h1>
                    <p>a reliable approach to media</p>
                </div>
            </header>

            <main>
                {(!results) ?
                <>
                <div className={styles.intro}>
                    <h2>Abstract</h2>
                    <p>
                        Our goal is to help you find the most reliable sources of media. 
                        We achieve this by analyzing the contents of the excerpt for factors 
                        such as bias, emotional language, and factual accuracy. Our system is 
                        not perfect, but we believe it is a step in the right direction -- ensuring 
                        you are well informed.
                    </p>
                </div>

                <div className={styles.content}>
                    <textarea
                        onChange={(e) => setText(e.target.value)}
                        placeholder="Start by pasting a news article or excerpt here..."
                        rows={15}
                    />

                    <button
                        onClick={handleSubmit}
                    >Get Started</button>
                </div>
                </>
                :
                <Results results={results} />
                }
            </main>
        </div>
    )
}

const Logo = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512">
            <path d="M168 80c-13.3 0-24 10.7-24 24V408c0 8.4-1.4 16.5-4.1 24H440c13.3 0 24-10.7 24-24V104c0-13.3-10.7-24-24-24H168zM72 480c-39.8 0-72-32.2-72-72V112C0 98.7 10.7 88 24 88s24 10.7 24 24V408c0 13.3 10.7 24 24 24s24-10.7 24-24V104c0-39.8 32.2-72 72-72H440c39.8 0 72 32.2 72 72V408c0 39.8-32.2 72-72 72H72zM176 136c0-13.3 10.7-24 24-24h96c13.3 0 24 10.7 24 24v80c0 13.3-10.7 24-24 24H200c-13.3 0-24-10.7-24-24V136zm200-24h32c13.3 0 24 10.7 24 24s-10.7 24-24 24H376c-13.3 0-24-10.7-24-24s10.7-24 24-24zm0 80h32c13.3 0 24 10.7 24 24s-10.7 24-24 24H376c-13.3 0-24-10.7-24-24s10.7-24 24-24zM200 272H408c13.3 0 24 10.7 24 24s-10.7 24-24 24H200c-13.3 0-24-10.7-24-24s10.7-24 24-24zm0 80H408c13.3 0 24 10.7 24 24s-10.7 24-24 24H200c-13.3 0-24-10.7-24-24s10.7-24 24-24z"/>
        </svg>
    )
}

const Loading = () => {

    const loadingText = [
        'Loading...',
        'Politicians hate us!',
        'We\'re not biased, we swear!',
        'Crushing bad news one article at a time',
        'Did you know that 99% of news is fake? or are we the fake news?',
        'AI Calhacks 2023 going crazy'
    ]

    const [i, setI] = useState<number>(0)

    useEffect(() => {
        const interval = setInterval(() => {
            setI((i + 1) % loadingText.length)
        }, 3000)

        return () => clearInterval(interval)
    }, [i])


    return (
        <div className={styles.loading}>
            <LoadingIcon />
            <h1>{loadingText[i]}</h1>
            <p>Thank you for your patience, we will process and display your results shortly. </p>
        </div>
    )
}

const LoadingIcon = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" 
        // style={{
        //     margin: 'auto', 
        //     background: 'rgb(255, 255, 255)', 
        //     display: 'block', shape-rendering: 'auto'
        // }} 
            width="200px" height="200px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
            <circle cx="50" cy="50" fill="none" stroke="#424242" strokeWidth="10" r="35" strokeDasharray="164.93361431346415 56.97787143782138">
            <animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" dur="1s" values="0 50 50;360 50 50" keyTimes="0;1"></animateTransform>
            </circle>
        </svg>
    )
}

const Results = ({ results } : { results: any }) => {

    const maxEmotionalNameWidth = results.emotionalData.reduce((max: number, emotion: any) => {
        return Math.max(max, emotion.emotion.length)
    }, 0)

    console.log(maxEmotionalNameWidth)

    return (
        <div className={styles.results}>
            <header>
                <div className={styles.headline}>
                    <h4>Title</h4>
                    <h1>{results.title}</h1>
                </div>
                <div className={styles.score}>
                    <h4>Score</h4>
                    <h1>{results.score}/10</h1>
                </div>
            </header>

            <div className={styles.panelGrid}>

                <Panel style={{
                    gridColumn: 'span 2'
                }}>
                    <h1>Summary</h1>
                    <p>{results.summary}</p>
                </Panel>

                <Panel style={null}>
                    <h1>Emotional Charge</h1>
                    <p>Emotion is a powerful tool used by the media to influence the reader. The below graph shows the emotional charge of the article.</p>
                    {results.emotionalData.map((emotion: any, i: number) => {
                        return (
                            <RangeBar key={i} val={emotion.percentage * 100} label={emotion.emotion + ' '.repeat(maxEmotionalNameWidth - emotion.emotion.length)} />
                        )
                    })}
                </Panel>

                <Panel style={null}>
                    <h1>Political Bias</h1>
                    <p>The below graph shows the political bias of the article. The closer the article is to the center, the more neutral it is. The further it is from the center, the more biased it is.</p>
                    <Spectrum val={-50} />
                </Panel>

                <Panel style={null}>
                        <h1>Positive vs. Negative</h1>

                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            gap: '1rem'
                        }}
                    >
                        <p>Lorum ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, quis aliquam nisl nunc eu nisl. </p>
                        <ContrastingBar val={results.positivePercentage} />
                    </div>
                </Panel>

                <Panel style={{
                    // gridRow: 'span 3'
                }}>
                    <h1>In Depth Analysis</h1>
                    <p>{results.indepthAnalysis}</p>
                </Panel>

                <Panel style={{
                    gridColumn: 'span 2'
                }}>
                    <h1>Another Perspective</h1>
                    <p>{results.otherPerspective}</p>
                </Panel>

            </div>
        </div>
    )
}


export default Landing