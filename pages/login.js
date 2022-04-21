import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Login.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Login</title>
        <meta name="description" content="by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <form>
        <div className={styles.container}>
		      <h1 className = {styles.header}>Project Manager</h1>
		        <p>Hi, It's nice to meet you. Please log in.</p>
          <label for="username"><b>Username </b></label>
          <input className = {styles.login_input} type="text" placeholder="Enter Username" name="username" required></input>
		      <br></br>
          <label for="psw"><b>Password </b></label>
		      <input className = {styles.login_input} type="password" placeholder="Enter Password" name="psw" required></input>
		      <br></br>
          <button className = {styles.login_button} type="submit">Login</button>
		      <label input type="checkbox" checked="checked" name="remember"> Remember me</label>
	      </div>
      </form>
    </div>
  )
}
