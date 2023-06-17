import styles from './Landing.module.css'

import { useState } from 'react'

const Landing = () => {

    const [text, setText] = useState<string>('')

    const handleSubmit = () => {
        console.log(text)
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

export default Landing