import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Router from 'next/router';
import { useState } from 'react';



export default function Home() {
  const [errorMsg, setError] = useState('')
  const handleSubmit = async event => {
    event.preventDefault()
    const result = await fetch('/api/register', {
      method: 'POST',
      body: JSON.stringify({
        username: event.target.username.value,
        password: event.target.password.value
      }),
      headers: {
        'Content-Type': 'application/json'
      },
    })
    const { ok, issue } = await result.json()
    if (!ok) {
      setError(issue)
    } else {
      event.target.username.value = ''
      event.target.password.value = ''
      Router.push('/login') // redirect to login
    }
  }
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <h3 className={styles.title}>Register</h3>
        <br></br>
        <form onSubmit={handleSubmit} className={styles.form}>
          <label htmlFor="username">
            Username&nbsp;
            <input id="username" name="username" autoComplete="username" type="text"/>
          </label>
          <label htmlFor="password">
            Password&nbsp;&nbsp;
            <input id="password" name="password" autoComplete="password" type="password"/>
          </label>
          <label className={styles.warning}>{errorMsg}</label>
          <br></br>
          <input type="submit" value="Register"/>
        </form>
      </main>
    </div>
  )
}
