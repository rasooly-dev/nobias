import styles from './Landing.module.css'

import { useState, useEffect } from 'react'

const Landing = () => {

    const [text, setText] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)

    const handleSubmit = () => {
        console.log(text)
        setLoading(true)
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
            <circle cx="50" cy="50" fill="none" stroke="#424242" stroke-width="10" r="35" stroke-dasharray="164.93361431346415 56.97787143782138">
            <animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" dur="1s" values="0 50 50;360 50 50" keyTimes="0;1"></animateTransform>
            </circle>
        </svg>
    )
}


export default Landing