import Link from "next/link";

export async function getServerSideProps(context) {
    const id = context.query.id;

    const res = await fetch(`${process.env.BASE_URL}/api/posts/${id}`);
    const data = await res.json();
    
    const [title, city, population, flag] = data;

    return { 
        props: {
            title,
            city,
            population,
            flag
        } 
    }
}

export default function Post({ title, city, population, flag }) {
    const countryCode = flag.toLowerCase();

    return <article>
        <h1>{title}</h1>
        <div>
            <p>City: {city}</p>
            <p>Population: { population }</p>
            <p>{countryCode}</p>
            <img src={`https://flagcdn.com/${countryCode}.svg`} width="140" alt={title} /> 
        </div>
        <Link href="/posts">
            <button>Back</button>
        </Link>
    </article>
}