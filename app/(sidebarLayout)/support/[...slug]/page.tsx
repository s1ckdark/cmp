'use client';
import ViewPage from './view';
import ListPage from './list';
import EditPage from './edit';
import { useRouter } from 'next/navigation';

const SupportPage = ({ params }:any) => {
  const { slug } = params;
  const router = useRouter();
  const type = slug[0];
  const id = slug[1];
  // Render different components based on the slug value
  const renderPage = () => {
    switch (type) {
      case 'view':
        return <ViewPage />;
      case 'list':
        return <ListPage />;
      case 'edit':
        return <EditPage />;
      default:
        // Redirect to a 404 page or display a not found message
        // You can also use router.push('/404') to redirect to a custom 404 page
        return <p>Page not found.</p>;
    }
  };

  return (
    <div>
      <h1>{type} - {id}</h1>
      {renderPage()}
    </div>
  );
};

// export async function generateStaticParams() {
//   const posts = await fetch('https://.../posts').then((res) => res.json())

//   return posts.map((post) => ({
//     slug: post.slug,
//   }))
// }
export default SupportPage;