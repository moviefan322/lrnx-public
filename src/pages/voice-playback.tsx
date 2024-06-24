import React from 'react'
import Head from 'next/head'
import dynamic from 'next/dynamic'
const VoicePlayback = dynamic(() => import('@/components/VoicePlayback'), {
    ssr: false,
  })
import styles from '@/styles/Home.module.css'

const VoiceSelection = () => {
  return (
    <>
    <Head>
      <title>Laronix</title>
      <meta name="description" content="Laronix Voice App" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <main className={styles.main}>
      <div className={styles.description}>
        <div>
          <a
            href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
          </a>
        </div>
      </div>

      <div className={styles.center}>
        <VoicePlayback/>  
      </div>
    </main>
  </>
  );
}

export default VoiceSelection;