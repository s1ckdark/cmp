import Searchbar from '@/components/Searchbar';
import { Tables } from '@/components/Tables';
import Breadcrumb from '@/components/Breadcrumb';
import Styles from './LogList.module.scss';
const LogList = () => {
    return (
        <>
            <Breadcrumb />
            <div className={`${Styles.table} ${Styles.withSearchbar}`}>
                <Searchbar rowType={"log"} />
                <Tables rowType={'log'} />
            </div>
        </>
    )
}
export default LogList;