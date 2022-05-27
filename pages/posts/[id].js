import Link from "next/link";
import countries from "../../countries.json";

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

    return <article>
        <h1>{title}</h1>
        <div>
            <p>City: {city}</p>
            <p>Population: { population }</p>
            <img src={`https://flagcdn.com/${getCountryCode(title)}.svg`} width="140" alt={title} /> 
        </div>
        <Link href="/posts">
            <button>Back</button>
        </Link>
    </article>
}