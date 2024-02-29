'use client';
import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { apiBe } from '@/services';
import styles from './RegistrationForm.module.scss';
import Button from '@/components/Button';
import { Toast } from '@/components/Toast';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Select, { defaultTheme } from 'react-select';
import { useRecoilState } from 'recoil';
import Loading from '@/components/Loading';
import { IRegistrationForm } from '@/types/form';
import { modalAtom } from '@/states';
import { confirmAtom } from '@/states/confirm';
import _ from 'lodash';

interface IRegistrationFormProps {
  data?: IRegistrationForm;
  type: 'register' | 'edit' | 'view';
}

const RegistrationForm = ({ data, type }: IRegistrationFormProps) => {
  const [mounted, setMounted] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [modal, setModal] = useRecoilState(modalAtom);
  const [confirm, setConfirm] = useRecoilState(confirmAtom);
  const [privilegeOptions, setPrivilegeOptions] = useState<any[]>([]);
  const [defaultPrivilegeOptions, setDefaultPrivilegeOptions] = useState<any[]>([]);
  const [passwordChecker, setPasswordChecker] = useState(false);
  const [myData, setMyData] = useState<IRegistrationForm>(
    data || {
      id: '',
      username: '',
      userFullName: '',
      userType: '',
      privileges: [],
      password: '',
      confirmPassword: '',
      email: '',
      mobile: '',
      phone: '',
      addr: '',
      addrDetail: '',
      zipcode: '',
      memberNo: '',
      memberName: '',
      salesName: '',
      admin: '',
      activated: '',
      regId: '',
      regName: '',
      regDt: '',
    },
  );
  const { id, username, userFullName, userType, privileges, password, confirmPassword, email, mobile, phone, addr, addrDetail, zipcode, memberNo, memberName, salesName, admin, activated, regId, regName, regDt } = data || {};

  const {
    control,
    handleSubmit,
    getValues,
    register,
    watch,
    setValue,
    setError,
    formState: { errors },
  } = useForm({
    defaultValues: {
      id: id,
      username: userFullName,
      userType: userType,
      privileges: privileges,
      password: password,
      confirmPassword: password,
      email: email,
      mobile: mobile,
      phone: phone,
      zipcode: zipcode,
      addr: addr,
      addrDetail: addrDetail,
      memberNo: memberNo,
      memberName: memberName,
      salesName: salesName,
      isAdmin: privileges?.includes('admin') ? 'true' : 'false',
      isActivated: activated,
      regId: regId,
      regName: regName,
      regDt: regDt,
    },
  });

  const router = useRouter();
  const onSubmit = async (data: any) => {
    let tmp = _.cloneDeep(data);
    if (getValues('privileges')?.includes('admin')) {
      // setValue("isAdmin", "true");
      tmp['isAdmin'] = 'true';
    }
    if (passwordChecker === false && type === 'register') {
      Toast('warning', '비밀번호를 확인해주세요.');
      return false;
    }
    let url = '',
      method = '';
    if (type === 'register' && passwordChecker) {
      url = '/user';
      method = 'put';
      setValue('isActivated', 'true');
    } else if (type === 'edit') {
      url = `/user/${username}`;
      method = 'post';
    } else {
      return false;
    }

    const response = await apiBe(url, { method, data: tmp });
    if (response.status === 200 || response.status === 201) {
      Toast('success', '등록되었습니다.', () => router.push('/admin/user/list/1'));
    } else if (response.status === 409) {
      Toast('error', '이미 존재하는 ID입니다.');
    } else {
      Toast('error', '등록에 실패하였습니다.');
    }
  };
  const watchPW = watch('password');
  const watchConfirmPW = watch('confirmPassword');
  useEffect(() => {
    setPasswordChecker(false);
  }, [watchPW, watchConfirmPW]);

  const passwordCheck = () => {
    const password: any = getValues('password');
    const newPassword: any = getValues('confirmPassword');
    const status = password === newPassword ? true : false;
    if (!status) {
      Toast('warning', '비밀번호가 일치하지 않습니다.');
    } else {
      Toast('success', '패스워드가 일치합니다', () => setPasswordChecker(true));
    }
  };

  const openModal = (searchType: string) => {
    if (type === 'view') return false;
    setModal({ isOpen: true, type: searchType, data: null });
  };

  const pwCloseModal = () => {
    const modal: any = document.querySelector('#passwordModal');
    const pwInput = modal.querySelector('.modalPassword');
    const pwConfirmInput = modal.querySelector('.modalComfirmPassword');

    if (modal) {
      modal.classList.remove(styles.open);
      pwInput.value = '';
      pwConfirmInput.value = '';
    }
  };

  const passwordModal = () => {
    const modal: any = document.querySelector('#passwordModal');
    if (modal) {
      modal.classList.add(styles.open);
    }
  };

  const passwordChange = async () => {
    const newPassword: any = (document.querySelector('.modalPassword') as HTMLInputElement)?.value;
    const confirmPassword: any = (document.querySelector('.modalComfirmPassword') as HTMLInputElement)?.value;
    if (newPassword.length >= 6 && confirmPassword.length >= 6) {
      if (newPassword === confirmPassword) {
        const data = {
          newPassword: newPassword,
          newPasswordConfirm: confirmPassword,
        };
        const url = `/user/changePassword/${id}`;
        const response = await apiBe.post(url, data);
        if (response.status === 200 || response.status === 201) {
          Toast('success', '비밀번호가 변경되었습니다.', () => pwCloseModal());
        } else {
          Toast('error', '비밀번호 변경에 실패하였습니다.', () => pwCloseModal());
        }
      } else {
        Toast('warning', '비밀번호가 일치하지 않습니다.', () => pwCloseModal());
      }
    } else {
      Toast('warning', '비밀번호는 6자리 이상으로 입력해주세요.');
    }
  };

  const userTypeOptions = [
    { value: '고객사', label: '고객사' },
    { value: 'GD', label: 'GD' },
  ];

  const editMode = () => {
    router.push(`/admin/user/edit/${id}`);
  };

  const isActivatedUser = async (activated: boolean) => {
    if (getValues('privileges')?.includes('admin')) {
      setValue('isAdmin', 'true');
    } else {
      setValue('isAdmin', 'false');
    }
    let message = activated ? '활성화' : '비활성화';
    if (activated) {
      setValue('isActivated', 'true');
    } else {
      setValue('isActivated', 'false');
    }
    const form: any = getValues();
    // let tmp = _.cloneDeep(form);
    // tmp.isActivated = activated ? "true" : "false";
    // if (getValues("privileges")?.includes("admin")) {
    //     tmp.isAdmin = "true";
    // } else {
    //     tmp.isAdmin = "false";
    // }
    const url = `/user/${id}`;
    const response = await apiBe.post(url, form);
    if (response.status === 200 || response.status === 201) {
      Toast('success', message + ' 되었습니다.', () => router.push('/admin/user/list/1'));
    }
  };

  const confirmActivated = () => {
    // watchAct 값이 'true' (문자열) 또는 true (불리언)인지 확인하고,
    // 그에 따라 메시지와 버튼 텍스트를 설정합니다.
    const isActive = !activated;
    const buttonText = isActive ? '비활성화' : '활성화';
    const message = isActive ? '비활성화 하시겠습니까?' : '활성화 하시겠습니까?';

    setConfirm({
      open: true,
      title: buttonText,
      message: message,
      onConfirm: () => isActivatedUser(isActive),
    });
  };

  useEffect(() => {
    if (modal.type === 'address' && modal?.data?.zipcode && modal?.data?.addr) {
      setValue('zipcode', modal.data.zipcode, { shouldValidate: true });
      setValue('addr', modal.data.addr, { shouldValidate: true });
    }
    if (modal.type === 'member' && modal?.data?.memberName && modal?.data?.memberNo) {
      setValue('memberName', modal.data.memberName, {
        shouldValidate: true,
      });
      setValue('memberNo', modal.data.memberNo, { shouldValidate: true });
    }
  }, [modal]);

  useEffect(() => {
    if (data) {
      setValue('id', data.id);
      setValue('username', data.userFullName);
      setValue('userType', data.userType);
      setValue('privileges', data.privileges);
      setValue('email', data.email);
      setValue('mobile', data.mobile);
      setValue('phone', data.phone);
      setValue('zipcode', data.zipcode);
      setValue('addr', data.addr);
      setValue('addrDetail', data.addrDetail);
      setValue('memberNo', data.memberNo);
      setValue('memberName', data.memberName);
      setValue('salesName', data.salesName);
      setValue('isActivated', data.activated);
    }
    const getPrivilegeOptions = async () => {
      const response = await apiBe('/role');
      if (response.status === 200 || response.status === 201) {
        const result = response.data;
        let tmp: any = [];
        if (result) {
          result.map((item: any) => {
            tmp.push({ value: item.name, label: item.name });
          });
          setPrivilegeOptions(tmp);
          const defaultPrivileges = privilegeOptions.filter((option) => privileges?.includes(option.value));
          console.log(defaultPrivileges);
          setDefaultPrivilegeOptions(defaultPrivileges);
        }
      }
    };

    if (defaultPrivilegeOptions.length === 0) {
      getPrivilegeOptions();
    }
    if (type === 'view') {
      setIsDisabled(true);
    }
    if (type === 'register' || type === 'edit') {
      setIsDisabled(false);
    }
    setMounted(true);
  }, [type, data, confirm]);

  if (mounted === false) return <Loading />;
  return (
    <>
      <form className={`${styles.template} ${styles[type]}`} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.inputGroup}>
          <label htmlFor="email">
            회원ID<span className={styles.required}></span>
          </label>
          <input readOnly={isDisabled} type="text" id="email" {...register('email', { required: true })} defaultValue={email} placeholder="이메일 양식으로 입력해주세요." />
          {errors.email && <span className={styles.errorMsg}>필수 입력 항목입니다</span>}
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="username">
            회원명<span className={styles.required}></span>
          </label>
          <input
            readOnly={isDisabled}
            type="text"
            id="username"
            {...register('username', {
              required: true,
              minLength: 2,
            })}
            defaultValue={userFullName}
          />
          {errors.username && <span className={styles.errorMsg}>필수 입력 항목입니다. 2자 이상으로 등록해주세요</span>}
        </div>
        <div className="grid gap-6 mb-6 md:grid-cols-2">
          <div className={styles.inputGroup}>
            <label htmlFor="userType">
              회원유형<span className={styles.required}></span>
            </label>
            <Controller
              name="userType"
              control={control}
              defaultValue={userType}
              rules={{ required: true }}
              render={({ field }) => <Select {...field} options={userTypeOptions} isDisabled={isDisabled} value={userTypeOptions.find((c) => c.value === field.value)} onChange={(val) => field.onChange(val?.value)} />}
            />
            {errors.userType && <span className={styles.errorMsg}>필수 입력 항목입니다</span>}
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="privileges">
              권한<span className={styles.required}></span>
            </label>
            <Controller
              name="privileges"
              control={control}
              defaultValue={defaultPrivilegeOptions} // Set the default options
              rules={{ required: true }}
              render={({ field }) => (
                <Select
                  {...field}
                  options={privilegeOptions}
                  isDisabled={isDisabled}
                  isMulti
                  value={privilegeOptions.filter((option: any) => field.value?.includes(option.value))} // Fixed line
                  onChange={(val) => field.onChange(val.map((item) => item.value))}
                />
              )}
            />
            <input type="hidden" {...register('isActivated')} defaultValue={activated} />
            <input type="hidden" {...register('isAdmin')} defaultValue={admin} />
          </div>
        </div>
        <div className={styles.inputGroup}>
          {type === 'register' ? (
            <div className="flex items-end">
              <div className={styles.password}>
                <label htmlFor="password">
                  비밀번호
                  <span className={styles.required}></span>
                </label>
                <input
                  readOnly={isDisabled}
                  type="password"
                  id="password"
                  {...register('password', {
                    required: true,
                    minLength: 6,
                  })}
                  defaultValue={password}
                />
                {errors.password && <span className={styles.errorMsg}>필수 입력 항목입니다. 6자리 이상으로 입력해주세요</span>}
              </div>
              <div className={styles.password}>
                <label htmlFor="confirmPassword">
                  비밀번호 확인
                  <span className={styles.required}></span>
                </label>
                <input
                  readOnly={isDisabled}
                  type="password"
                  id="confirmPassword"
                  {...register('confirmPassword', {
                    required: true,
                    minLength: 6,
                  })}
                />
                {errors.confirmPassword && <span className={styles.errorMsg}>필수 입력 항목입니다. 6자리 이상으로 입력해주세요</span>}
              </div>
              <div className={`${styles.btnArea} ${styles.btnPasswordCheck}`}>
                <Button type="button" skin="gray" onClick={passwordCheck}>
                  {passwordChecker ? '검증완료' : '검증'}
                </Button>
              </div>
            </div>
          ) : type === 'edit' ? (
            <div className="flex items-end">
              <div className={styles.password}>
                <label htmlFor="password">
                  비밀번호
                  <span className={styles.required}></span>
                </label>
                <Button type="button" onClick={() => passwordModal()} skin="gray">
                  비밀번호 수정
                </Button>
              </div>
            </div>
          ) : (
            <></>
          )}
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="mobile">
            전화<span className={styles.required}></span>
          </label>
          <Controller rules={{ required: true }} name="mobile" control={control} render={({ field }) => <input readOnly={isDisabled} type="text" id="mobile" {...field} defaultValue={mobile} placeholder="010-XXXX-XXXX 양식으로 입력하세요" />} />
          {errors.mobile && <span className={styles.errorMsg}>필수 입력 항목입니다</span>}
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="phone">
            유선전화<span className={styles.required}></span>
          </label>
          <input readOnly={isDisabled} type="phone" id="phone" {...register('phone', { required: false })} defaultValue={phone} />
        </div>

        <div className={styles.inputGroup}>
          <div className="flex items-end">
            <div className={styles.zipcode}>
              <label htmlFor="zipcode">
                우편 번호
                <span className={styles.required}></span>
              </label>
              <input readOnly={true} type="text" id="zipcode" {...register('zipcode', { required: true })} defaultValue={zipcode} onClick={() => openModal('address')} />
              {errors.zipcode && <span className={styles.errorMsg}>필수 입력 항목입니다</span>}
            </div>
            <div className={styles.address}>
              <label htmlFor="addr">
                주소<span className={styles.required}></span>
              </label>
              <input readOnly={true} type="text" id="addr" {...register('addr', { required: true })} defaultValue={addr} onClick={() => openModal('address')} />
              {errors.addr && <span className={styles.errorMsg}>필수 입력 항목입니다</span>}
            </div>
            <div className={styles.addressDetail}>
              <label htmlFor="addrDetail">
                상세 주소
                <span className={styles.required}></span>
              </label>
              <input readOnly={isDisabled} type="text" id="addrDetail" {...register('addrDetail')} defaultValue={addrDetail} />
            </div>
            {type === 'edit' || type === 'register' ? (
              <div className={`${styles.btnArea} ${styles.btnAddrSearch}`}>
                <Button type="button" onClick={() => openModal('address')} skin={'gray'}>
                  주소 검색
                </Button>
              </div>
            ) : null}
          </div>
        </div>
        <div className={styles.inputGroup}>
          <div className="flex items-end">
            <div className={styles.memberNo}>
              <label htmlFor="memberNo">
                회사번호
                <span className={styles.required}></span>
              </label>
              <input readOnly={true} type="text" id="memberNo" {...register('memberNo', { required: true })} defaultValue={memberNo} onClick={() => openModal('member')} />
              {errors.memberNo && <span className={styles.errorMsg}>필수 입력 항목입니다</span>}
            </div>
            <div className={styles.memberName}>
              <label htmlFor="memberName">
                회사이름
                <span className={styles.required}></span>
              </label>
              <input readOnly={true} type="text" id="memberName" {...register('memberName', { required: true })} defaultValue={memberName} onClick={() => openModal('member')} />
              {errors.memberName && <span className={styles.errorMsg}>필수 입력 항목입니다</span>}
            </div>
            {type === 'edit' || type === 'register' ? (
              <div className={`${styles.btnMemberSearch} ${styles.btnArea}`}>
                <Button type="button" onClick={() => openModal('member')} skin={'gray'}>
                  회사 검색
                </Button>
              </div>
            ) : null}
          </div>
        </div>

        <div className={`${styles.btnArea} mt-6 mx-auto`}>
          {type === 'view' && (
            <Button type="button" onClick={editMode} skin="submit">
              수 정
            </Button>
          )}
          {type === 'edit' ? (
            <>
              <Button type="submit" skin="submit">
                수 정
              </Button>
              <Button type="button" onClick={confirmActivated} skin="del">
                {!activated ? '활성화' : '비활성화'}
              </Button>
            </>
          ) : null}
          {type === 'register' ? (
            <Button type="submit" onClick={handleSubmit(onSubmit)} skin="green">
              등 록
            </Button>
          ) : null}
          <Button type="button" onClick={() => router.back()} skin={'gray'}>
            {type === 'register' || type === 'edit' ? '취소' : '목록'}
          </Button>
        </div>
      </form>

      {type === 'edit' ? (
        <div id="passwordModal" className={`${styles.modal} ${styles.passwordModal}`}>
          <span className={styles.closeBtn} onClick={() => pwCloseModal()}>
            &times;
          </span>
          <div className={styles.innerModal}>
            <div className={styles.inputGroup}>
              <label htmlFor="newPassword">
                비밀번호
                <span className={styles.required}></span>
              </label>
              <input readOnly={isDisabled} name="newPassword" type="password" className="modalPassword" />
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="confirmPassword">
                비밀번호 확인
                <span className={styles.required}></span>
              </label>
              <input readOnly={isDisabled} name="confirmPassword" type="password" className="modalComfirmPassword" />
            </div>
            <div className={styles.btnArea}>
              <Button type="button" className={styles.btnPasswordChange} onClick={() => passwordChange()} skin={'green'}>
                확인
              </Button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default RegistrationForm;
