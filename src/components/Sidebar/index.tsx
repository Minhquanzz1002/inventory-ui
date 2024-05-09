"use client";
import Image from "next/image";
import Link from "next/link";
import React, {useEffect, useRef, useState} from "react";
import SidebarLink from "./SidebarLink";
import SidebarLinkDropdown from "./SidebarLinkDropdown";
import {
    ArrowLeft,
    BaggageClaim,
    BookUser,
    Fence,
    PackageSearch,
    ShoppingCart,
    Tag,
    TickerPercent,
    Warehouse
} from "@/components/Icons";
import LayoutGrid from "../Icons/LayoutGrid";


interface SidebarProps {
    sidebarOpen: boolean;
    setSidebarOpen: (arg: boolean) => void;
}

interface Category {
    name: string;
    path: string;
    icon: React.ReactNode;
    sub?: SubCategory[];
}

interface SubCategory {
    name: string;
    path: string;
}

const Sidebar = ({sidebarOpen, setSidebarOpen}: SidebarProps) => {
    const categories: Category[] = [
        {
            name: "Trang chủ",
            path: "",
            icon: <LayoutGrid/>,
        },
        {
            name: "Sản phẩm",
            path: "products",
            icon: <Tag/>,
            sub: [
                {
                    name: "Tất cả sản phẩm",
                    path: "products"
                }
            ]
        },
        {
            name: "Đơn hàng",
            path: "orders",
            icon: <ShoppingCart/>,
            sub: [
                {
                    name: "Tất cả đơn hàng",
                    path: "orders"
                },
                {
                    name: "Tạo đơn hàng",
                    path: "add"
                },
                {
                    name: "Cập nhật đơn hàng",
                    path: "update"
                },
            ]
        },
        {
            name: "Nguyên vật liệu",
            path: "materials",
            icon: <PackageSearch/>,
            sub: [
                {
                    name: "Tất cả nguyên vật liệu",
                    path: "materials"
                },
            ]
        },
        {
            name: "Nhà cung cấp",
            path: "providers",
            icon: <BaggageClaim/>,
        },
        {
            name: "Tồn kho",
            path: "inventory",
            icon: <Fence/>,
            sub: [
                {
                    name: "Danh sách thành phẩm",
                    path: "inventory"
                },
                {
                    name: "Nhap kho thành phẩm",
                    path: "nhap-kho-thanh-pham"
                },
                {
                    name: "Xuất kho thành phẩm",
                    path: "xuat-kho-thanh-pham"
                },
            ]
        },
        {
            name: "Khuyến mãi",
            path: "discounts",
            icon: <TickerPercent/>,
        },
        {
            name: "Khách hàng",
            path: "customers",
            icon: <BookUser/>
        },
        {
            name: "Kho",
            path: "warehouses",
            icon: <Warehouse/>
        },
    ]

    const trigger = useRef<any>(null);
    const sidebar = useRef<any>(null);


    const [sidebarExpanded, setSidebarExpanded] = useState<boolean>(true);

    // close on click outside
    useEffect(() => {
        const clickHandler = ({target}: MouseEvent) => {
            if (!sidebar.current || !trigger.current) return;
            if (
                !sidebarOpen ||
                sidebar.current.contains(target) ||
                trigger.current.contains(target)
            )
                return;
            setSidebarOpen(false);
        };
        document.addEventListener("click", clickHandler);
        return () => document.removeEventListener("click", clickHandler);
    });

    // close if the esc key is pressed
    useEffect(() => {
        const keyHandler = ({key}: KeyboardEvent) => {
            if (!sidebarOpen || key !== "Escape") return;
            setSidebarOpen(false);
        };
        document.addEventListener("keydown", keyHandler);
        return () => document.removeEventListener("keydown", keyHandler);
    });

    useEffect(() => {
        localStorage.setItem("sidebar-expanded", sidebarExpanded.toString());
        if (sidebarExpanded) {
            document.querySelector("body")?.classList.add("sidebar-expanded");
        } else {
            document.querySelector("body")?.classList.remove("sidebar-expanded");
        }
    }, [sidebarExpanded]);

    return (
        <aside
            ref={sidebar}
            className={`absolute left-0 top-0 z-9999 flex h-screen w-60 flex-col overflow-y-hidden bg-black duration-300 ease-linear dark:bg-boxdark lg:static lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"
            }`}
        >
            {/* Sidebar Header Start */}
            <div className="flex items-center justify-between gap-2 px-4 py-5.5 lg:py-6.5">
                <Link href="/">
                    <Image
                        width={176}
                        height={32}
                        src={"/images/logo/logo_test1.png"}
                        alt="Logo"
                        priority
                    />
                </Link>

                <button
                    ref={trigger}
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    aria-controls="sidebar"
                    aria-expanded={sidebarOpen}
                    className="block lg:hidden"
                >
                    <ArrowLeft/>
                </button>
            </div>
            {/* Sidebar Header End */}

            {/* Menu Start  */}
            <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
                <nav className="mt-2 py-3 lg:mt-5">
                    {/* Menu Group Start*/}
                    <div>
                        <h3 className="mb-4 ml-4 text-sm font-semibold text-bodydark2"> MENU </h3>

                        <ul className="mb-6 flex flex-col gap-1">
                            {
                                categories.map((category: Category, index: number) => (
                                    <div key={index}>
                                        {
                                            category.sub ? (
                                                <SidebarLinkDropdown icon={category.icon} category={category}
                                                                     sidebarExpanded={sidebarExpanded}
                                                                     setSidebarExpanded={setSidebarExpanded}/>
                                            ) : (
                                                <SidebarLink icon={category.icon} path={category.path}
                                                             name={category.name}/>
                                            )
                                        }
                                    </div>
                                ))
                            }
                        </ul>


                    </div>
                    {/* Menu Group End */}
                </nav>
            </div>
            {/* Menu End */}
        </aside>

    )

}
export default Sidebar;

