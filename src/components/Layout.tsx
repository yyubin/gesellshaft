import Topbar from './Topbar';
import React from "react";
import '@mantine/core/styles.css';

interface LayoutProps {
    children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
    return (
        <div className="min-h-screen p-4 bg-gray-100 dark:bg-gray-900">
            <Topbar />
            <main className="p-8">{children}</main>
        </div>
    );
};

export default Layout;