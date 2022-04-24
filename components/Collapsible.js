import styles from '../styles/collapsible.module.css'
import { useState } from 'react';

export default function Collapsible(props) {
  const [show, setShow] = useState(false);
  const onClick = (e) => {
    e.preventDefault();
    setShow(!show)
  }
  return (<>
    <button onClick={onClick} type="button" className={styles.collapsible}>{props.name}</button>
    <div className={styles.content} style={{display: show ? 'block' : 'none' }}>
      <p>{props.description}</p>
    </div>
  </>)
}