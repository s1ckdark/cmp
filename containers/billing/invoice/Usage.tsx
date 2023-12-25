import React from 'react';
import { TableHeader } from '@/components/Tables/TableHeader';
import styles from './Usage.module.scss';
import { useRecoilValue } from 'recoil';
import { dataViewAtom } from '@/states/data';
import { addComma } from '@/utils/data';
interface UsageProps {
    type: string;
    data: any;
}


const Usage = () => {
    const invoice = useRecoilValue(dataViewAtom);
    const { data, memberNo, targetMonth } = invoice || {}; // Add null check and provide default value



    const GroupedDataTable = ({ data }) => {
        const productTypes = ['naverProduct','gdSw', 'gdMsp'];
        const normalizeData = (productData, productType) => {
            return productData.map(item => {
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
        
        
        const renderProdutType = (productType) => {
            return productType === 'naverProduct' ? '네이버' : '자사'
        }

        const renderProductData = (productType, productData) => {
            const normalizedData = normalizeData(productData, productType);
    
            const groupedData = normalizedData.reduce((acc, item) => {
                const { demandType } = item;
                acc[demandType] = acc[demandType] || [];
                acc[demandType].push(item);
                return acc;
            }, {});
    
            const totalRows = normalizedData.length;
    
            const renderValue = (item, key) => {
                return item[key] !== undefined ? item[key] : '-';
            };
    
            return (
                <>
                    {Object.entries(groupedData).map(([demandType, items], groupIndex) => (
                        items.map((item, index) => (
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
                                <td>{data.target_start_date}</td>
                                <td>{data.target_end_date}</td>
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
                    data[productType] && Array.isArray(data[productType]) ? renderProductData(productType, data[productType]) : null

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
            <GroupedDataTable data={data} />
        </div>
    );
};

export default Usage;
