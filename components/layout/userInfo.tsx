import Link from "next/link";
import { useEffect } from "react";
import { SidebarProps } from "@/types/common";
import styles from "@/styles/components/layout/userInfo.module.scss";
import { useRecoilValue, RecoilState } from 'recoil';
import { tokenState, token } from '@/states/sessionStorage';
import { useRouter } from "next/navigation";

const UserInfo = () => {
  const isOpen = true;
  const router = useRouter();
  const token:token = useRecoilValue(tokenState);
  useEffect(() => {
    if (!token) {
      if (!token) {
        router.push('/login');
      }
    }
  }, [token]);

  const user = {
    name:"홍길동"
  }

  return (
    <>
      <div className={`userinfo ${styles.container}`}>
        <div className="container mx-auto p-6">
          <div className={`${styles.user_name} text-right px-2`}>
            <p className="mb-6">{user.name}</p>
          </div>
          <div className="link_area flex items-center justify-end px-2">
            <span className="setting">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.4328 10.98C17.4728 10.66 17.5028 10.34 17.5028 10C17.5028 9.66 17.4728 9.34 17.4328 9.02L19.5428 7.37C19.7328 7.22 19.7828 6.95 19.6628 6.73L17.6628 3.27C17.5428 3.05 17.2728 2.97 17.0528 3.05L14.5628 4.05C14.0428 3.65 13.4828 3.32 12.8728 3.07L12.4928 0.42C12.4628 0.18 12.2528 0 12.0028 0H8.00277C7.75277 0 7.54277 0.18 7.51277 0.42L7.13277 3.07C6.52277 3.32 5.96277 3.66 5.44277 4.05L2.95277 3.05C2.72277 2.96 2.46277 3.05 2.34277 3.27L0.342769 6.73C0.212769 6.95 0.272769 7.22 0.462769 7.37L2.57277 9.02C2.53277 9.34 2.50277 9.67 2.50277 10C2.50277 10.33 2.53277 10.66 2.57277 10.98L0.462769 12.63C0.272769 12.78 0.222769 13.05 0.342769 13.27L2.34277 16.73C2.46277 16.95 2.73277 17.03 2.95277 16.95L5.44277 15.95C5.96277 16.35 6.52277 16.68 7.13277 16.93L7.51277 19.58C7.54277 19.82 7.75277 20 8.00277 20H12.0028C12.2528 20 12.4628 19.82 12.4928 19.58L12.8728 16.93C13.4828 16.68 14.0428 16.34 14.5628 15.95L17.0528 16.95C17.2828 17.04 17.5428 16.95 17.6628 16.73L19.6628 13.27C19.7828 13.05 19.7328 12.78 19.5428 12.63L17.4328 10.98ZM10.0028 13.5C8.07277 13.5 6.50277 11.93 6.50277 10C6.50277 8.07 8.07277 6.5 10.0028 6.5C11.9328 6.5 13.5028 8.07 13.5028 10C13.5028 11.93 11.9328 13.5 10.0028 13.5Z" fill="#F5F8FB"/>
                <path d="M17.4328 10.98C17.4728 10.66 17.5028 10.34 17.5028 10C17.5028 9.66 17.4728 9.34 17.4328 9.02L19.5428 7.37C19.7328 7.22 19.7828 6.95 19.6628 6.73L17.6628 3.27C17.5428 3.05 17.2728 2.97 17.0528 3.05L14.5628 4.05C14.0428 3.65 13.4828 3.32 12.8728 3.07L12.4928 0.42C12.4628 0.18 12.2528 0 12.0028 0H8.00277C7.75277 0 7.54277 0.18 7.51277 0.42L7.13277 3.07C6.52277 3.32 5.96277 3.66 5.44277 4.05L2.95277 3.05C2.72277 2.96 2.46277 3.05 2.34277 3.27L0.342769 6.73C0.212769 6.95 0.272769 7.22 0.462769 7.37L2.57277 9.02C2.53277 9.34 2.50277 9.67 2.50277 10C2.50277 10.33 2.53277 10.66 2.57277 10.98L0.462769 12.63C0.272769 12.78 0.222769 13.05 0.342769 13.27L2.34277 16.73C2.46277 16.95 2.73277 17.03 2.95277 16.95L5.44277 15.95C5.96277 16.35 6.52277 16.68 7.13277 16.93L7.51277 19.58C7.54277 19.82 7.75277 20 8.00277 20H12.0028C12.2528 20 12.4628 19.82 12.4928 19.58L12.8728 16.93C13.4828 16.68 14.0428 16.34 14.5628 15.95L17.0528 16.95C17.2828 17.04 17.5428 16.95 17.6628 16.73L19.6628 13.27C19.7828 13.05 19.7328 12.78 19.5428 12.63L17.4328 10.98ZM10.0028 13.5C8.07277 13.5 6.50277 11.93 6.50277 10C6.50277 8.07 8.07277 6.5 10.0028 6.5C11.9328 6.5 13.5028 8.07 13.5028 10C13.5028 11.93 11.9328 13.5 10.0028 13.5Z" fill="#AFBDCA"/>
                </svg>
            </span>
            <span className="user px-3">
              <svg width="22" height="14" viewBox="0 0 22 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 6C16.66 6 17.99 4.66 17.99 3C17.99 1.34 16.66 0 15 0C13.34 0 12 1.34 12 3C12 4.66 13.34 6 15 6ZM7 6C8.66 6 9.99 4.66 9.99 3C9.99 1.34 8.66 0 7 0C5.34 0 4 1.34 4 3C4 4.66 5.34 6 7 6ZM7 8C4.67 8 0 9.17 0 11.5V14H14V11.5C14 9.17 9.33 8 7 8ZM15 8C14.71 8 14.38 8.02 14.03 8.05C15.19 8.89 16 10.02 16 11.5V14H22V11.5C22 9.17 17.33 8 15 8Z" fill="#F5F8FB"/>
              <path d="M15 6C16.66 6 17.99 4.66 17.99 3C17.99 1.34 16.66 0 15 0C13.34 0 12 1.34 12 3C12 4.66 13.34 6 15 6ZM7 6C8.66 6 9.99 4.66 9.99 3C9.99 1.34 8.66 0 7 0C5.34 0 4 1.34 4 3C4 4.66 5.34 6 7 6ZM7 8C4.67 8 0 9.17 0 11.5V14H14V11.5C14 9.17 9.33 8 7 8ZM15 8C14.71 8 14.38 8.02 14.03 8.05C15.19 8.89 16 10.02 16 11.5V14H22V11.5C22 9.17 17.33 8 15 8Z" fill="#AFBDCA"/>
              </svg>
            </span>
            <span className="home">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 0.5L0 7.78571H2.25V17.5H6.75V12.6429H11.25V17.5H15.75V7.71286L18 7.78571L9 0.5Z" fill="#F5F8FB"/>
              <path d="M9 0.5L0 7.78571H2.25V17.5H6.75V12.6429H11.25V17.5H15.75V7.71286L18 7.78571L9 0.5Z" fill="#AFBDCA"/>
              </svg>
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserInfo;
