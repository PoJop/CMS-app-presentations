import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

export default function Home({ data }) {

  const sendMessage = async () => {

    const resp = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify("message"),
    });
    console.log(resp)
  };
  const createServer = async () => {

    const resp = await fetch("/api/socketio", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify("message"),
    });
    console.log(resp)
  };
  return (
    <div className={styles.container}>
      <button onClick={sendMessage}> client</button>
      <button onClick={createServer}> createServer</button>


    </div>
  )
}
