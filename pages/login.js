import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Login.module.css'
import Router from 'next/router';



export default function Home() {
  const handleLogin = async (event) => {
    event.preventDefault()
    const result = await fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify({
        username: event.target.username.value,
        password: event.target.password.value
      }),
      headers: {
        'Content-Type': 'application/json'
      },
    })
    const { ok, issue, token } = await result.json()
    if (!ok) {
      
    } else {
      localStorage.setItem('token', token);
      localStorage.setItem('user', event.target.username.value);
      Router.push('/') // redirect to index page
    }
    event.target.username.value = ''
    event.target.password.value = ''
  }
  // if (localStorage.getItem('token') !== '') Router.push('/') // redirect to home page

  return (
    <div className={styles.container}>
      <Head>
        <title>Login</title>
        <meta name="description" content="by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.header}>
          <h1>Project Manager</h1>
          <p>Hi, It's nice to meet you. Please log in.</p>
        </div>
      <form onSubmit={handleLogin}>
        <label className={styles.login_label} for="username"><b>Username </b></label>
        <input className={styles.login_input} id="username" type="text" placeholder="Enter Username" name="username" required></input>
        <br></br>
        <label className={styles.login_label} for="psw"><b>Password </b></label>
        <input className={styles.login_input} id="password" type="password" placeholder="Enter Password" name="psw" required></input>
        <button className={styles.login_button} type="submit">Login</button>
      </form>
      <button className={styles.registerbtn} type="submit">Register</button>
    </div>
  )
}
