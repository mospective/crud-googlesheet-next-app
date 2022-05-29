import Link from "next/link";
import countries from "../../countries.json";
import styles from "../../styles/locationPage.module.css";

export async function getServerSideProps(context) {
    const id = context.query.id;

    const res = await fetch(`${process.env.BASE_URL}/api/posts/${id}`);
    const data = await res.json();
    
    const [title, city, population] = data;

    return { 
        props: {
            title,
            city,
            population
        } 
    }
}

export default function Post({ title, city, population }) {
    const getCountryCode = (country) => {
        const countryCodeValue= Object.fromEntries(Object.entries(countries).filter( values => values.includes(country))); 
        for (let i in countryCodeValue ){
            return i;
        }
      };

    return <article className={styles["result-container"]}>
            <div className={styles.result}>
                <h1 className={styles.title}>{title}</h1>
                <div className={styles.info}>
                    <div className={styles["info-text"]}>
                        <p>Capital city: {city}</p>
                        <p>Population: { population }</p>
                    </div>
                    <div className={styles["info-flag"]}>
                        <img src={`https://flagcdn.com/${getCountryCode(title)}.svg`} width="400" alt={title} />
                    </div>
                </div>
                <Link href="/posts">
                    <button className="back-btn">Back</button>
                </Link>
            </div>
    </article>
}