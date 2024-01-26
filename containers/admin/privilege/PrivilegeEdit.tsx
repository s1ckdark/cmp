import { Tables } from '@/components/Tables';
import Breadcrumb from '@/components/Breadcrumb';
const PrivilegeList = () => {
    return (
        <>
            <Breadcrumb />
            <Tables rowType={'privilege'} />
        </>
    )
}
export default PrivilegeList;