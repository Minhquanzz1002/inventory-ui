import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const SidebarLink = ({ icon, path, name }: { icon: React.ReactNode; path: string, name: string }) => {
    const pathname = usePathname();

    return (
        <li>
            <Link
                href={"/" + path}
                className={`group relative text-sm flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${(pathname.includes(path) && path !== "") || (pathname === "/" && path === "") && "bg-graydark dark:bg-meta-4"}`}
            >
                {icon}
                {name}
            </Link>
        </li>
    );
}

export default SidebarLink;