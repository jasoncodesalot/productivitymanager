import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Index.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    </div>
  )
}     