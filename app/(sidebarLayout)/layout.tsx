'use client';
import Header from '@/components/layout/Header';
import Sidebar from "@/components/layout/Sidebar";
import Footer from "@/components/layout/Footer";

export default function SidebarLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <Sidebar />
            <div className="page">
                <Header />
                {children}
                <Footer />
            </div>
        </>
    );
}

