import React from 'react';
import { useRecoilValue } from 'recoil';

import { dataViewAtom } from '@/states/data';
import { addComma } from '@/utils/data';

import styles from './Usage.module.scss';
import { TableHeader } from '@/components/Tables/TableHeader';
interface UsageProps {
    type: string;
    data: any;
}


const Usage = () => {
    const invoice = useRecoilValue(dataViewAtom);
    const { data, memberNo, targetMonth } = invoice || {}; // Add null check and provide default value



    const GroupedDataTable = ({ tableData }:any) => {
        const productTypes = ['naverProduct','gdSw', 'gdMsp'];
        const normalizeData = (productData:any, productType:any) => {
            return productData.map((item:any)=> {
                if (productType === 'gdSw' || productType === 'gdMsp') {
                    return {
                        ...item,
                        demandType: item.prodDetailType,
                        region: '-',
                        instanceName: productType ==='gdSw' ? item.prodName +'-'+item.prodDetailTypeStd : item.prodName,
                        process_method: '-',
                        useAmount: item.useAmount,
                        promiseDiscountAmount: item.promiseDiscountamount,
                        memberPriceDiscountAmount: item.memberpricediscountamount,
                        memberPromiseDiscountAddAmount: item.memberpromisediscountadddamount,
                        etcDiscountAmount: item.etcdiscountamount,
                        demandAmount: item.estimateuseAmount,
                        target_start_date: item.target_start_date,
                        target_end_date: item.target_end_date
                        // Map fields from gdSW/gdMSP to naverProduct format
                        // region: item.someOtherRegionField, // Example
                        // Add other field mappings as needed
                    };
                }
                return item;
            });
        };
        
        
        const renderProdutType = (productType:string) => {
            return productType === 'naverProduct' ? '네이버' : '자사'
        }

        const renderProductData = (productType:any, productData:any) => {
            const normalizedData = normalizeData(productData, productType);
    
            const groupedData = normalizedData.reduce((acc:any, item:any) => {
                const { demandType } = item;
                acc[demandType] = acc[demandType] || [];
                acc[demandType].push(item);
                return acc;
            }, {});
    
            const totalRows = normalizedData.length;
    
            const renderValue = (item:any, key:any) => {
                return item[key] !== undefined ? item[key] : '-';
            };
    
            return (
                <>
                    {Object.entries(groupedData).map(([demandType, items]:any, groupIndex) => (
                        items.map((item:any, index:any) => (
                            <tr key={`${productType}-${demandType}-${index}-${groupIndex}`}>
                                {groupIndex === 0 && index === 0 && (
                                    <td rowSpan={totalRows}>{renderProdutType(productType)}</td>
                                )}
                                {index === 0 && <td rowSpan={items.length}>{renderValue(item, 'service_type')}</td>}
                                {index === 0 && <td rowSpan={items.length}>{demandType}</td>}
                                <td>{renderValue(item, 'region')}</td>
                                <td>{renderValue(item, 'instanceName')}</td>
                                <td>{renderValue(item, 'process_method')}</td>
                                <td>{addComma(renderValue(item, 'useAmount'))}</td>
                                <td>{addComma(renderValue(item, 'promiseDiscountAmount'))}</td>
                                <td>{addComma(renderValue(item, 'memberPriceDiscountAmount'))}</td>
                                <td>{addComma(renderValue(item, 'memberPromiseDiscountAddAmount'))}</td>
                                <td>{addComma(renderValue(item, 'etcDiscountAmount'))}</td>
                                <td>{addComma(renderValue(item, 'demandAmount'))}</td>
                                <td>{tableData.target_start_date}</td>
                                <td>{tableData.target_end_date}</td>
                            </tr>
                        ))
                    ))}
                </>
            );
        };
    
        return (
            <table className="table w-full invoiceUsage">
                <TableHeader rowType={'invoiceUsage'} />
                <tbody>
                {productTypes.map(productType => 
                    tableData[productType] && Array.isArray(tableData[productType]) ? renderProductData(productType, tableData[productType]) : null

                )}
                        </tbody>
            </table>
        );
    };
    if (!data) return <div>Loading...</div>;
    return (
        <div className={styles.usage}>
            <hgroup>
                <h1>이용내역</h1>
            </hgroup>
            <GroupedDataTable tableData={data} />
        </div>
    );
};

export default Usage;
