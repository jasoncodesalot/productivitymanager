import styles from '../styles/collapsible.module.css'
import { useState } from 'react';

export default function Task(props) {
  const [show, setShow] = useState(false);

  const onClick = (e) => {
    e.preventDefault();
    setShow(!show)
  }

  const remove = async () => {
    const result = await fetch('/api/remove', {
      method: 'POST',
      body: JSON.stringify({
        token: localStorage.getItem('token'),
        id: props.id
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }
  
  return (<>
    <div className={styles.taskList}>
      <button onClick={onClick} type="button" className={styles.collapsible}>{props.name}</button>
      <button onClick={remove} type="button" className={styles.delete_button}>X</button>
      <div className={styles.content} style={{display: show ? 'block' : 'none' }}>
        <p>{props.description}</p>
      </div>
    </div>
  </>)
}