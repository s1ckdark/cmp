import ViewPage from './view';
import ListPage from './list';
import WritePage from './write';

const ProductPage = async({ params }:any) => {
  const { slug } = params;
  const type:string = slug[0];
  const id:number = parseInt(slug[1]);

  const renderPage = () => {
    switch (type) {
      case 'view':
        return <ViewPage />;
      case 'list':
        return <ListPage tableName={"productGd"} pageNumber={id} className={"productGd border"}/>
      case 'write':
        return <WritePage />;
      default:
        // Redirect to a 404 page or display a not found message
        // You can also use router.push('/404') to redirect to a custom 404 page
        return <p>Page not found.</p>;
    }
  };

  return (
    <>
      {renderPage()}
    </>
    );
};

export default ProductPage