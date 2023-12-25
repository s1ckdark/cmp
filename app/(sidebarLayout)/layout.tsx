import Header from '@/app/(sidebarLayout)/_common/Header';
import Sidebar from "@/app/(sidebarLayout)/_common/Sidebar";
import Footer from "@/app/(sidebarLayout)/_common/Footer";
import { ReactNode } from 'react';

export default async function SidebarLayout({
    children,
}: {
    children: ReactNode;
}) {
    return (
        <>  
            <div className="flex page bg-white dark:bg-black">
                <Sidebar />
                <div className="container">
                    <Header />
                    {children}
                    <Footer />
                </div>
            </div>
        </>
    );
}

