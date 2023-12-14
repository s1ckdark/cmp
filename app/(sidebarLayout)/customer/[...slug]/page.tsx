import ViewPage from './view';
import ListPage from './list';
import EditPage from './edit';
import { getCookie } from '@/utils/cookie';

const CustomerPage = async({ params }:any) => {
  const { slug } = params;
  const type:string = slug[0];
  const id:number = parseInt(slug[1]);
  const token = getCookie('next-auth.session-token');
  console.log(token);

  const renderPage = () => {
    switch (type) {
      case 'view':
        return <ViewPage />;
      case 'list':
        return <ListPage tableName={"customers"} pageNumber={id} className={"border"}/>
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

export default CustomerPage;