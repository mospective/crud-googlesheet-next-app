import { useState } from "react";
import Link from 'next/link';
import { useRouter } from 'next/router';
import AddLocation from '../../components/addLocation';

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

  return (
    <article>
      <h1>Countries</h1>
      {isLoading && <Loading />}
      {!isLoading && (
         <ul>
         {posts.map((country, i) => (
           <li key={i}>
             <Link href={`posts/${i + 2}/?=${country}`}>
               <a>{country}</a>
             </Link>
             <button onClick={removeLocationHandler} data-label={ i + 2 }>Delete</button>
           </li>
         ))}
       </ul>
      )}
     
      <AddLocation pullRefresh={refreshData} loading={updateLoader}/>
      <Link href="/">
          <button>Return to Home</button>
      </Link>
    </article>
  );
}