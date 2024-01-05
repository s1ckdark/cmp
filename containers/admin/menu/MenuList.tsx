import { Tables } from '@/components/Tables';
import Breadcrumb from '@/components/Breadcrumb';

const MenuList = () => {
    return (
        <>
            <Breadcrumb />
            <Tables rowType={'menu'} className={'MenuList'} />
        </>
    )
}
export default MenuList;