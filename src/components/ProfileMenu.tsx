import {Avatar, Button, Menu, MenuHandler, MenuItem, MenuList, Typography} from "@material-tailwind/react";
import {ChevronDownIcon, PowerIcon,} from "@heroicons/react/24/outline";
import React, {useMemo} from "react";
import useAuth from "@/hooks/useAuth";

const ProfileMenu = () => {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const closeMenu = () => setIsMenuOpen(false);

    const {logoutUser} = useAuth();

    const profileMenuItems = useMemo(() => {
        return [
            {
                label: "Sign Out",
                icon: PowerIcon,
                execute: logoutUser,
            },
        ];
    }, [logoutUser]);

    return (
        <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
            <MenuHandler>
                <Button
                    variant="text"
                    color="blue-gray"
                    className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto"
                >
                    <Avatar
                        variant="circular"
                        size="sm"
                        alt="oppai man"
                        className="border border-blue-500 p-0.5"
                        src="https://c10.patreonusercontent.com/4/patreon-media/p/campaign/4556864/4d620119aec84cd584057974f8ffee4b/eyJoIjoxMDgwLCJ3IjoxMDgwfQ%3D%3D/2.png?token-time=1690675200&amp;token-hash=I0Inr8dH_kfsLQg5qNb3JmUAYl7WD6phWa3EmP96edw%3D"
                    />
                    <ChevronDownIcon
                        strokeWidth={2.5}
                        className={`h-3 w-3 transition-transform ${
                            isMenuOpen ? "rotate-180" : ""
                        }`}
                    />
                </Button>
            </MenuHandler>
            <MenuList className="p-1">
                {profileMenuItems.map(({label, icon, execute}, key) => {
                    const isLastItem = key === profileMenuItems.length - 1;
                    return (
                        <MenuItem
                            key={label}
                            onClick={execute}
                            className={`flex items-center gap-2 rounded ${
                                isLastItem
                                    ? "hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10"
                                    : ""
                            }`}
                        >
                            {React.createElement(icon, {
                                className: `h-4 w-4 ${isLastItem ? "text-red-500" : ""}`,
                                strokeWidth: 2,
                            })}
                            <Typography
                                as="span"
                                variant="small"
                                className="font-normal"
                                color={isLastItem ? "red" : "inherit"}
                            >
                                {label}
                            </Typography>
                        </MenuItem>
                    );
                })}
            </MenuList>
        </Menu>
    );
}

export default ProfileMenu;
