import React from "react";
import {auth} from "@clerk/nextjs";
import {redirect} from "next/navigation";
import prismadb from "@/lib/prismadb";
import Navbar from "@/components/navbar";
interface DashboardLayoutProps {
    children: React.ReactNode;
    params: { storeId: string };
}


export default function DashboardLayout({children, params} : DashboardLayoutProps) {
    const {userId} = auth();
    const {storeId: id} = params;
    if(!userId) {
        redirect("/sign-in")
    }

    const store = prismadb.store.findFirst({
        where: {
            id,
            userId
        }
    });

    if(!store) {
        redirect("/");
    }

    return( <>
        <Navbar />
        {children}
    </>)

}