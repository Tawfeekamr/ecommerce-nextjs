"use client";
import React from "react";
import {cn} from "@/lib/utils";
import {useParams, usePathname} from "next/navigation";
import Link from "next/link";

export default function MainNav({className, ...props}: React.HTMLAttributes<HTMLElement>) {
    const pathname = usePathname();
    const params = useParams();
    const storeId = params?.storeId;

    const routes = [{
        href: `/${params.storeId}/settings`,
        label: "Settings",
        active: pathname === `${storeId}/settings`
    }]
    return (
        <>
            {routes.map((route, index) => (
                <Link
                    key={`${route.href}-${index}`}
                    href={route.href}
                    className={cn("text-sm font-medium transition-colors hover:text-primary mx-4",
                        route.active ? "text-black dark:text-white" : "text-muted-foreground")}> {route.label} </Link>
            ))}
            <nav className={cn("flex items-center space-x-4 lg:space-x-6", className)}></nav>
        </>
    )
}