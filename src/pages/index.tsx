import React from 'react'
import Head from 'next/head'
import dynamic from 'next/dynamic'

const AudioRecorder = dynamic(() => import('@/components/AudioRecorder'), {
  ssr: false,
})

export default function Home() {
  return (
    <>
      <Head>
        <title>Laronix</title>
        <meta name="description" content="Laronix Voice App" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AudioRecorder /> 
    </>
  );
}
