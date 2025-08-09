'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FaUser, FaGhost, FaDungeon } from 'react-icons/fa';
import { IconType } from 'react-icons';
import { Burger, Drawer, Stack } from '@mantine/core';
import { ThemeToggleButton } from "@/components/ThemeToggleButton";

interface NavItemProps {
    href: string;
    icon: IconType;
    label: string;
    onClick?: () => void;
}

const NavItem = ({ href, icon: Icon, label, onClick }: NavItemProps) => {
    return (
        <Link href={href} passHref>
            <div
                onClick={onClick}
                className="flex items-center space-x-4 px-4 py-2 rounded-lg text-gray-800 dark:text-white font-semibold hover:bg-gray-200 dark:hover:bg-gray-900 transition-colors duration-200 cursor-pointer"
            >
                <Icon className="w-5 h-5" />
                <span>{label}</span>
            </div>
        </Link>
    );
};

const Topbar = () => {
    const [opened, setOpened] = useState(false);

    return (
        <>
            <header className="bg-white dark:bg-gray-800 p-4 flex justify-between items-center rounded-lg shadow-md">
                <Link href={"/"}>
                    <div className="text-gray-900 dark:text-white text-2xl font-bold cursor-pointer">
                        Gesellschaft
                    </div>
                </Link>

                {/* --- CHANGED START --- */}
                {/* 오른쪽 요소들을 그룹으로 묶어 정렬합니다. */}
                <div className="flex items-center gap-4">
                    {/* 데스크톱용 내비게이션 */}
                    <nav className="hidden md:flex space-x-2">
                        <NavItem href="/persona" icon={FaUser} label="인격" />
                        <NavItem href="/ego" icon={FaGhost} label="E.G.O" />
                        <NavItem href="/mirror-dungeon" icon={FaDungeon} label="거울던전" />
                    </nav>

                    {/* 테마 토글 버튼 */}
                    <ThemeToggleButton />

                    {/* 모바일용 버거 메뉴 */}
                    <Burger
                        opened={opened}
                        onClick={() => setOpened(true)}
                        className="md:hidden"
                        aria-label="메뉴 열기"
                    />
                </div>
                {/* --- CHANGED END --- */}
            </header>

            {/* 모바일 메뉴 Drawer */}
            <Drawer
                opened={opened}
                onClose={() => setOpened(false)}
                title="메뉴"
                position="right"
                overlayProps={{ backgroundOpacity: 0.5, blur: 4 }}
            >
                <Stack>
                    <NavItem href="/persona" icon={FaUser} label="인격" onClick={() => setOpened(false)} />
                    <NavItem href="/ego" icon={FaGhost} label="E.G.O" onClick={() => setOpened(false)} />
                    <NavItem href="/mirror-dungeon" icon={FaDungeon} label="거울던전" onClick={() => setOpened(false)} />
                </Stack>
            </Drawer>
        </>
    );
};

export default Topbar;