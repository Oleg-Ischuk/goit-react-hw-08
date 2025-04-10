import styles from "./Home.module.css";

const Home = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Contacts Manager App</h1>
      <p className={styles.description}>
        Welcome to the Contacts Manager application. This app allows you to
        store and manage your contacts securely.
      </p>
    </div>
  );
};

export default Home;
