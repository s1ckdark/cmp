import Breadcrumb from "@/components/Breadcrumb";
import { Tables } from "@/components/Tables";
import Searchbar from "@/components/Searchbar";
import Styles from './CustomerList.module.scss';

const CustomerList = () => {
    return (
        <>
            <Breadcrumb />
            <div className={`${Styles.table} ${Styles.withSearchbar}`}>
                <Searchbar rowType={'customers'} />
                <Tables rowType={'customers'} />
            </div>
        </>
    );
}
export default CustomerList;