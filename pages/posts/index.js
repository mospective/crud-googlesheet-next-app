import { useState } from "react";
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
      {isLoading && <Loading />}
      {!isLoading && (
        <>
          <div className={styles.cards}>
          {posts.map((country, i) => (
             <div className={styles.card} key={i}>
                  <Link href={`/posts/${i + 2}/?=${country}`}>
                    <a>{country}</a>
                  </Link>
                  <img src={`https://flagcdn.com/${getCountryCode(country)}.svg`} width="40" alt={country} />
                  <button onClick={removeLocationHandler} data-label={ i + 2 }>Delete</button>
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
     
      <AddLocation pullRefresh={refreshData} loading={updateLoader}/>
      <Link href="/">
          <button>Return to Home</button>
      </Link>
    </article>
  );
}