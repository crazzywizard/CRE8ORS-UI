import type { NextPage } from "next"
import SeoHead from "../components/SeoHead"
import styles from "../styles/Home.module.css"
import AllowList from "../components/AllowList"

const Home: NextPage = () => (
  <div className={styles.container}>
    <SeoHead title="CRE8ORS" description="CRE8ORS coming soon" image="" />

    <main className={styles.main}>
      <h1 className={styles.title}>CRE8ORS</h1>
      <AllowList />
    </main>
  </div>
)

export default Home
