import { useState } from "react";
import Image from "next/image";
import Link from 'next/link';
import { useRouter } from 'next/router';
import countries from "../../countries.json";
import AddLocation from '../../components/addLocation';
import styles from "../../styles/Home.module.css";

export async function getServerSideProps() {
    const res = await fetch(`${process.env.BASE_URL}/api/posts`);
    const data = await res.json();

    return {
      props: {
        posts: data,
        loading: false
      }
    }
  }

export default function Post({ posts, loading }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(loading);
  const refreshData = () => router.replace(router.asPath);

  const removeLocationHandler = async (e) => {
    setIsLoading(!isLoading);
    // row number
    const rowNumber = e.target.dataset.label;
    const response = await fetch(`api/posts/${rowNumber}`, {
      method: "DELETE"
    });

    if (refreshData) {
      refreshData();
      setIsLoading(isLoading);
    }
    
  };

  const updateLoader = (status) => {
    setIsLoading(status)
  }

  const Loading = () => {
    return <div>Loading...</div>
  }

  const getCountryCode = (country) => {
    const countryCodeValue= Object.fromEntries(Object.entries(countries).filter( values => values.includes(country))); 
    for (let i in countryCodeValue ){
        return i;
    }
  };

  return (
    <article className="content">
      <h1 className="heading">Countries</h1>
      <AddLocation pullRefresh={refreshData} loading={updateLoader}/>
      {isLoading && <Loading />}
      {!isLoading && (
        <>
          <div className={styles.cards}>
          {posts.map((country, i) => (
             <div className={styles.card} key={i}>
                  <div className={styles.flag}>
                    <Image src={`https://flagcdn.com/${getCountryCode(country)}.svg`} width={1200} height={600} layout="responsive" />
                  </div>
                  <div className={styles["card-content"]}>
                      <p className={styles["title-heading"]}>{country}</p>
                      <div className={styles["cta-links"]}>
                          <Link href={`/posts/${i + 2}/?=${country}`}>
                            <a className={styles.view}>View more</a>
                          </Link>
                          <button className={styles.delete} onClick={removeLocationHandler} data-label={ i + 2 }>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="94.926"
                                height="94.926"
                                x="0"
                                y="0"
                                enableBackground="new 0 0 94.926 94.926"
                                version="1.1"
                                viewBox="0 0 94.926 94.926"
                                xmlSpace="preserve"
                              >
                                <path d="M55.931 47.463L94.306 9.09a2.118 2.118 0 000-2.994L88.833.62a2.123 2.123 0 00-2.996 0L47.463 38.994 9.089.62c-.795-.795-2.202-.794-2.995 0L.622 6.096a2.117 2.117 0 000 2.994l38.374 38.373L.622 85.836a2.117 2.117 0 000 2.994l5.473 5.476a2.123 2.123 0 002.995 0l38.374-38.374 38.374 38.374c.397.396.937.62 1.498.62s1.101-.224 1.498-.62l5.473-5.476a2.118 2.118 0 000-2.994L55.931 47.463z"></path>
                              </svg>
                          </button>
                      </div>
                  </div>
              </div>
            ))}
          </div>
          {/* <ul>
          {posts.map((country, i) => (
             <li key={i}>
                <Link href={`/posts/${i + 2}/?=${country}`}>
                  <a>{country}</a>
                </Link>
                <img src={`https://flagcdn.com/${getCountryCode(country)}.svg`} width="40" alt={country} />
                <button onClick={removeLocationHandler} data-label={ i + 2 }>Delete</button>
              </li>
            ))}
          </ul> */}
        </>
      )}
     
      <Link href="/">
          <button>Return to Home</button>
      </Link>
    </article>
  );
}