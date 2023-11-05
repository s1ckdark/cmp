'use client';
import styles from './index.module.scss'
import { TableHeader } from '@/components/Tables';

const BillingNaver = () => {
    return (
        <>
            <table className="items-center w-full mb-0 align-top border-gray-200 text-slate-500 border">
                <TableHeader type="billingNaver" />
                <tbody>
                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                </tbody>
            </table>
        </>
    )
}

export default BillingNaver;