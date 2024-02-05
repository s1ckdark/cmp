import Link from 'next/link'
import { ArgosLogoLrg } from '@/public/svgs';
import styles from './index.module.scss';

export default function Home() {
    return (
        <main className={styles.bgIntro}>
            <div className="flex items-center justify-center w-screen h-screen flex-col">
                <div className="mb-10">
                    <ArgosLogoLrg />
                </div>
                <div className="mb-10">
                    <Link href="/signin" className={`${styles.btnStart} px-3.5 py-2.5 font-bold text-white shadow-sm`}>Get started</Link>
                </div>
            </div>
        </main>
    )
}