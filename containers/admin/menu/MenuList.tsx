import { Tables } from '@/components/Tables';
import Breadcrumb from '@/components/Breadcrumb';

const MenuList = () => {
    return (
        <>
            <Breadcrumb />
            <Tables rowType={'menu'} />
        </>
    )
}
export default MenuList;