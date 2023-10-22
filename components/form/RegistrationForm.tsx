'use client';
import { useState, ChangeEvent, FormEvent } from 'react';



const RegistrationForm = () => {
    const initialFormData: FormData = {
        memberId: '',
        memberType: '',
        memberName: '',
        permission: '',
        password: '',
        contact: '',
        landline: '',
        email: '',
        address: '',
        company: ''
    };

    const [formData, setFormData] = useState<FormData>(initialFormData);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(formData);
    };

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="memberId">회원ID:</label>
            <input type="text" id="memberId" name="memberId" value={formData.memberId} onChange={handleChange} required /><br /><br />

            <label htmlFor="memberId">회원명:</label>
            <input type="text" id="memberName" name="memberId" value={formData.memberName} onChange={handleChange} required /><br /><br />

            <label htmlFor="memberType">회원유형:</label>
            <input type="text" id="memberType" name="memberType" value={formData.memberType} onChange={handleChange} required /><br /><br />

            <label htmlFor="permission">권한:</label>
            <input type="text" id="permission" name="permission" value={formData.permission} onChange={handleChange} required /><br /><br />

            <label htmlFor="password">비밀번호:</label>
            <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} required /><br /><br />

            <label htmlFor="contact">연락처:</label>
            <input type="text" id="contact" name="contact" value={formData.contact} onChange={handleChange} required /><br /><br />

            <label htmlFor="landline">유선전화:</label>
            <input type="text" id="landline" name="landline" value={formData.landline} onChange={handleChange} /><br /><br />

            <label htmlFor="email">이메일:</label>
            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required /><br /><br />

            <label htmlFor="address">주소:</label>
            <input type="text" id="address" name="address" value={formData.address} onChange={handleChange} required /><br /><br />

            <label htmlFor="company">회사:</label>
            <input type="text" id="company" name="company" value={formData.company} onChange={handleChange} /><br /><br />

            <input type="submit" value="등록" />
        </form>
    );
}

export default RegistrationForm;