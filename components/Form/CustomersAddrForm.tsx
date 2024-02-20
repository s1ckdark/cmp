'use client';
import styles from './CustomersAddrForm.module.scss';
import { useFormContext, useFieldArray } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { modalAtom } from '@/states';
import { useRecoilState } from 'recoil';
import { IconSearch } from '@/public/svgs';
import { ICustomersAddrForm} from '@/types/form';
import { useRouter } from 'next/navigation';


const CustomersAddrForm = ({ type, pageType, data }: any) => {
    const [modal, setModal] = useRecoilState(modalAtom);
    const [isDisabled, setIsDisabled] = useState(false);
    const { id, name, zipcode, addr, addrDetail }: ICustomersAddrForm = data || {};
    const { control, register, setValue, formState: { errors }}:any = useFormContext();
    const { fields, append, prepend, remove, swap, move, insert } = useFieldArray({
        control, // control props comes from useForm (optional: if you are using FormContext)
        name: "address", // unique name for your Field Array
      });
    
    const router = useRouter();

    const openModal = (type: string) => {
        setModal({
            isOpen: true,
            type: "address",
            data: null
        })
    }
    useEffect(() => {
        if (modal.data?.zipcode && modal.data?.addr) {
            setValue('address.0.zipcode', modal.data.zipcode);
            setValue('address.0.addr', modal.data.addr);
        }
    }, [modal]);

    useEffect(() => {
        if (pageType === "view") setIsDisabled(true);
    }, [pageType])

    return (
        <>
            <div className={styles.addressForm}>
                {fields.map((field, index) => (
                <div className="columns-4 gap-12 relative"  key={field.id}>
                    <div className={styles.inputGroup}>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-900 dark:text-black">주소지명<span className={styles.required}></span></label>
                        <input readOnly={isDisabled} type="text" id="name" {...register(`address.${index}.name`, {required:true, disabled:isDisabled})} defaultValue={name} />
                        {errors.address?.[index]?.name && <span className={styles.errorMsg}>필수 입력 항목 입니다</span>}
                    </div>
                    <div className={styles.inputGroup}>
                        <label htmlFor="zipcode" className="block text-sm font-medium text-gray-900 dark:text-black">우편 번호<span className={styles.required}></span></label>
                        <input readOnly={true} type="text" id="zipcode" {...register(`address.${index}.zipcode`, {required:true, disabled:isDisabled})} defaultValue={zipcode}  onClick={() => openModal('address')} />
                        {type === 'edit' || type === 'register' && <IconSearch className={styles.iconSearch} onClick={() => openModal('address')} />}
                        {errors.address?.[index]?.zipcode && <span className={styles.errorMsg}>필수 입력 항목 입니다</span>}
                    </div>
                    <div className={styles.inputGroup}>
                        <label htmlFor="addr" className="block text-sm font-medium text-gray-900 dark:text-black">주소<span className={styles.required}></span></label>
                        <input readOnly={true} type="text" id="addr" {...register(`address.${index}.addr`, {required:true, disabled:isDisabled})} defaultValue={addr}  onClick={() => openModal('address')} />
                        {errors.address?.[index]?.addr && <span className={styles.errorMsg}>필수 입력 항목 입니다</span>}
                    </div>
                    <div className={styles.inputGroup}>
                        <label htmlFor="addrDetail" className="block text-sm font-medium text-gray-900 dark:text-black">상세 주소<span className={styles.required}></span></label>
                        <input readOnly={isDisabled} type="text" id="addrDetail" {...register(`address.${index}.addrDetail`, { disabled:isDisabled})} defaultValue={addrDetail} />
                        {errors.address?.[index]?.addrDetail && <span className={styles.errorMsg}>필수 입력 항목 입니다</span>}
                    </div>
                </div>
                ))}
            </div>
        </>
    )
}
export default CustomersAddrForm;