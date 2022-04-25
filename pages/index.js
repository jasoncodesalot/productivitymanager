import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Index.module.css'
import Task from '../components/Task'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter()
  const [username, setUsername] = useState('user')
  const [tasks, setTasks] = useState([{name: 'Example Task',  description: 'Example description'}])
  const [btntext, setBtnText] = useState('Login')
  const headertext = () => btntext === 'Login' ? 'Press login there →' : `Hello, welcome ${username}!`
  const handleRefresh = async () => {
    setUsername(localStorage.getItem('user'))
    const result = await fetch('/api/tasks', {
      method: 'POST',
      body: JSON.stringify({
        token: localStorage.getItem('token')
      }),
      headers: {
        'Content-Type': 'application/json'
      },
    })
    const { ok, tasks } = await result.json()
    if (ok) {
      setTasks(tasks)
      setBtnText('Logout')
    } else {
      // router.push('/login')
    }
  }
  const logout = async e => {
    e.preventDefault();
    localStorage.clear();
    router.push('/login')
  }
  const handleCreateTask = async e => {
    e.preventDefault();
    const result = await fetch('/api/create', {
      method: 'POST',
      body: JSON.stringify({
        token: localStorage.getItem('token'),
        name: e.target.taskName.value,
        description: e.target.taskDescription.value
      }),
      headers: {
        'Content-Type': 'application/json'
      },
    })
  }
  useEffect(() => {
    handleRefresh()
  })
  return (<>
    {/*Top Header of the Page*/}
    <header> 
      <div className={styles.header_container}>
        <h1>{headertext()}</h1>
        <button onClick={logout} type="button" className={styles.button}>{btntext}</button>
      </div>
    </header>
    
    {/*Main Project Showcase*/}
    <div className={styles.page} style={{display: btntext === 'Logout' ? 'block' : 'none' }}>
      <div className={styles.containers}>
        <div className={styles.project_container}>
          {tasks.map(task => <Task name={task.name} description={task.description} id={task.id} />)}
        </div>
        <div className={styles.create_container}>
          <form onSubmit={handleCreateTask} className={styles.inputs}>
            <input className={styles.taskCreate} id="taskName" type="text" placeholder="Task Name" name="taskName" required></input>
            <input className={styles.taskCreate} id="taskDescription" type="text" placeholder="Task Description" name="taskDescription" required></input>
            <input type="submit" className={styles.createbtn} value="Create Task" />
          </form>
        </div>
      </div>
    </div>
  </>)
}
