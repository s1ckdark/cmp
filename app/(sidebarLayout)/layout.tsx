'use client';
import Header from '@/components/layout/header';
import Sidebar from "@/components/layout/sidebar";
import Footer from "@/components/layout/footer";

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

