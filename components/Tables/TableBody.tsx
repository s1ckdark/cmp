import React from 'react';
import styles from './index.module.scss'
interface TableBodyProps {
    data: Array<any>
}

export const TBody: React.FC<TableBodyProps> = (props) => {
    const { data } = props;
    return (
        <tbody className="border">
            {data.map((item: any, index: number) => (
                <tr key={index} className="text-center">
                    {Object.keys(item).map((key, index) => (
                        <td className="text-center" key={index}>{item[key]}</td>
                    ))}
                </tr>
            ))}
        </tbody>
    )
}

