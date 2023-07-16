import React, {useState} from 'react';
import Logo from '@/components/Logo';
import Link from 'next/link';
import useStorage from '@/hooks/useStorage';
import ProfileMenu from '@/components/ProfileMenu';
import {Button, Collapse, IconButton, MenuItem, Navbar, Typography} from '@material-tailwind/react';
import {Bars2Icon, BookOpenIcon, BuildingStorefrontIcon} from "@heroicons/react/24/outline";

const navListItems = [
    {
        label: "Home",
        icon: BuildingStorefrontIcon,
        url: '/',
    },
    {
        label: "Library",
        icon: BookOpenIcon,
        url: '/library',
    },
];

function NavList() {
    return (
        <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center">
            {navListItems.map(({label, icon, url}, key) => (
                <Typography
                    key={label}
                    as="a"
                    href={url}
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                >
                    <MenuItem className="flex items-center gap-2 lg:rounded-full">
                        {React.createElement(icon, {className: "h-[18px] w-[18px]"})}{" "}
                        {label}
                    </MenuItem>
                </Typography>
            ))}
        </ul>
    );
}

const Header = () => {
    const storeName = process.env.NEXT_PUBLIC_STORE_NAME;
    const [storage, setStorage, clearStorage] = useStorage();
    const [isNavOpen, setIsNavOpen] = useState(false);
    const toggleIsNavOpen = () => setIsNavOpen((cur) => !cur);

    React.useEffect(() => {
        window.addEventListener(
            "resize",
            () => window.innerWidth >= 960 && setIsNavOpen(false)
        );
    }, []);

    return (
        <Navbar className="mx-auto max-w-screen-xl p-2 z-10 sticky">
            <div className="relative mx-auto flex items-center text-blue-gray-900">
                <Logo width={36}/>
                <Typography
                    as="a"
                    href="#"
                    className="mr-4 ml-2 cursor-pointer py-1.5 font-medium"
                >
                    {storeName}
                </Typography>
                <div className="absolute top-2/4 left-2/4 hidden -translate-x-2/4 -translate-y-2/4 lg:block">
                    <NavList/>
                </div>
                <IconButton
                    size="sm"
                    color="blue-gray"
                    variant="text"
                    onClick={toggleIsNavOpen}
                    className="ml-auto mr-2 lg:hidden"
                >
                    <Bars2Icon className="h-6 w-6"/>
                </IconButton>
                {storage?.token ? (
                    <ProfileMenu/>
                ) : (
                    <div className="absolute right-12 md:right-20 lg:right-0">
                        <Link href="/login" className="mr-2">
                            <Button variant="text" size="sm" color="blue-gray">
                                Sign in
                            </Button>
                        </Link>
                        <Link href="/register">
                            <Button variant="gradient" size="sm">
                                Sign up
                            </Button>
                        </Link>
                    </div>
                )}
            </div>
            <Collapse open={isNavOpen} className="overflow-scroll z-10">
                <NavList/>
            </Collapse>
        </Navbar>
    )
};

export default Header;
