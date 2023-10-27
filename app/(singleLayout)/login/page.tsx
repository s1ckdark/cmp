import { cookies } from 'next/headers';

import Login from '@/containers/login';
// import { getBlogCategoriesAPI, fetchBlogPostsAPI } from '@/services/blog';
// import { cookiesToString } from '@/utils/cookie';

const LoginPage = async () => {
  // const cookieStore = cookies();
  // const cookiesString = cookiesToString(cookieStore.getAll());

  // const postsData = fetchBlogPostsAPI(cookiesString)
  //   .then((res) => res.data)
  //   .catch(() => []);
  // const categoriesData = getBlogCategoriesAPI().then((res) => res.data);
  // const [posts, categories] = await Promise.all([postsData, categoriesData]);

  return <Login />;
};

export default LoginPage;