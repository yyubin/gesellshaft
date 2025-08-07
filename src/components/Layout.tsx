import Topbar from './Topbar';
import React from "react";
import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';

interface LayoutProps {
    children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
    return (
        <html lang="ko">
        <head>
            {/* Mantine에 필요한 메타 태그 */}
            <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no" />
        </head>
        <body>
        <MantineProvider>
            <div className="min-h-screen p-4 bg-gray-100">
                <Topbar />
                <main className="p-8">
                    {children}
                </main>
            </div>
        </MantineProvider>
        </body>
        </html>
    );
};

export default Layout;