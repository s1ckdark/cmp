import { TableHeader } from '@/components/Tables';
import styles from './index.module.scss';
interface UsageProps {
    type: 'supply' | 'client';
    data: any;
}

const Usage: React.FC<UsageProps> = ({ type, data }) => {
    return (
        <div className={styles.usage}>
            <hgroup>
                <h1>이용내역</h1>
            </hgroup>
            <table className="table w-full">
                <TableHeader type={type} />
                <tbody>
                    <tr>
                        <td rowSpan={5}>네이버</td>
                        <td rowSpan={5}>MongoDB</td>
                        <td rowSpan={5}>공급</td>
                        <td>API(READ)</td>
                        <td>종량제</td>
                        <td>1,821,220</td>
                        <td>1,821,220</td>
                        <td>1,821,220</td>
                        <td>1,821,220</td>
                        <td>0</td>
                        <td>1,821,220</td>
                        <td>2023.06.01</td>
                        <td>2023.06.30</td>
                    </tr>
                    <tr>
                        <td>API(READ)</td>
                        <td>종량제</td>
                        <td>1,821,220</td>
                        <td>1,821,220</td>
                        <td>1,821,220</td>
                        <td>1,821,220</td>
                        <td>0</td>
                        <td>1,821,220</td>
                        <td>2023.06.01</td>
                        <td>2023.06.30</td>
                    </tr>
                    <tr>
                        <td>API(READ)</td>
                        <td>종량제</td>
                        <td>1,821,220</td>
                        <td>1,821,220</td>
                        <td>1,821,220</td>
                        <td>1,821,220</td>
                        <td>0</td>
                        <td>1,821,220</td>
                        <td>2023.06.01</td>
                        <td>2023.06.30</td>
                    </tr>
                    <tr>
                        <td>API(READ)</td>
                        <td>종량제</td>
                        <td>1,821,220</td>
                        <td>1,821,220</td>
                        <td>1,821,220</td>
                        <td>1,821,220</td>
                        <td>0</td>
                        <td>1,821,220</td>
                        <td>2023.06.01</td>
                        <td>2023.06.30</td>
                    </tr>
                    <tr>
                        <td colSpan={2}>소계</td>
                        <td>1,821,220</td>
                        <td>1,821,220</td>
                        <td>1,821,220</td>
                        <td>1,821,220</td>
                        <td>0</td>
                        <td>1,821,220</td>
                        <td colSpan={2}></td>
                    </tr>
                </tbody>
            </table>
        </div >
    );
};

export default Usage;
