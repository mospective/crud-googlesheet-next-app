import Link from "next/link";
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>

      <div className={styles.centered}>
        <h1 class={styles.heading}>Countries &amp; their capital's population</h1>
        <Link href="/posts">
          <button className={styles.buttonUI}>Show Locations</button>
        </Link>
      </div>
    
    </div>
  )
}
