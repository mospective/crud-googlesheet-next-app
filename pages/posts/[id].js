import Link from "next/link";

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

    return <article>
        <h1>{title}</h1>
        <div>
            <p>City: {city}</p>
            <p>Population: { population }</p>
        </div>
        <Link href="/posts">
            <button>Back</button>
        </Link>
    </article>
}