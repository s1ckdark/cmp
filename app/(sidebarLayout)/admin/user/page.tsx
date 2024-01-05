import { redirect } from 'next/navigation'
const UserPage = () => {
    redirect('/admin/users/list/1');
}
export default UserPage;