import Link from 'next/link';
import { FaUser, FaGhost, FaDungeon } from 'react-icons/fa';
import { IconType } from 'react-icons';

interface NavItemProps {
    href: string;
    icon: IconType;
    label: string;
}

const NavItem = ({ href, icon: Icon, label }: NavItemProps) => {
    return (
        <Link href={href}>
            <div className="flex items-center space-x-4 px-4 py-2 rounded-lg text-white font-semibold hover:bg-gray-900 transition-colors duration-200 cursor-pointer">
                <Icon className="w-5 h-5" />
                <span>{label}</span>
            </div>
        </Link>
    );
};

const Topbar = () => {
    return (
        <div className="bg-gray-800 p-4 flex justify-between items-center rounded-lg">
            <Link href={"/"}>
                <div className="text-white text-2xl font-bold">
                    Gesellschaft
                </div>
            </Link>

            <nav className="flex space-x-4">
                <NavItem href="/persona" icon={FaUser} label="Profile" />
                <NavItem href="/ego" icon={FaGhost} label="Ghosts" />
                <NavItem href="/mirror-dungeon" icon={FaDungeon} label="Dungeons" />
            </nav>
        </div>
    );
};

export default Topbar;
