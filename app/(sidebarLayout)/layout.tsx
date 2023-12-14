import Header from '@/app/(sidebarLayout)/_common/Header';
import Sidebar from "@/app/(sidebarLayout)/_common/Sidebar";
import Footer from "@/app/(sidebarLayout)/_common/Footer";
import { ReactNode } from 'react';
import { sessionChecker } from '@/components/Server';

const checker = async ()=> await sessionChecker();
export default async function SidebarLayout({
    children,
}: {
    children: ReactNode;
}) {
    return (
        <>  
            <Sidebar />
            <div className="page bg-white dark:bg-black">
                <div className="container">
                    <Header />
                    {children}
                    <Footer />
                </div>
            </div>
        </>
    );
}

