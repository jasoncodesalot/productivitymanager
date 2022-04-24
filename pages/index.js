import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Index.module.css'
import Collapsible from '../components/Collapsible'
if (typeof window !== 'undefined') {
  // Perform localStorage action
  var user = localStorage.getItem('user')
}

{/*document.getElementById('user').innerHTML = user;*/}
export default function Home() {
  return (<>
    {/*Top Header of the Page*/}
    <header> 
      <div className={styles.header_container}>
        <h1 id ="user">Hello, Welcome <span id="name"> </span> </h1>
        
        <button className={styles.logout}>Logout</button>
      </div>
    </header>

    {/*Main Project Showcase*/}
    <div className={styles.page}>

      <div className={styles.project_container}>
        <Collapsible name="ABC" description="xyz"/>
        <Collapsible name="ABC" description="xyz"/>
        <Collapsible name="ABC" description="xyz"/>
        <Collapsible name="ABC" description="xyz"/>
      </div>
    </div>
  </>)
}