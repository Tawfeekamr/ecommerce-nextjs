import React from "react";
import {auth} from "@clerk/nextjs";
import {redirect} from "next/navigation";
import prismadb from "@/lib/prismadb";



interface storeType {
    id: string;
    name: string;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
}
export default async function SetupLayout({children}: {children: React.ReactNode}) {
    const {userId} = auth();

    if(!userId) {
        redirect('/sign-in');
    }
    // @ts-ignore
    const store: storeType = await prismadb.store.findFirst({
        where: {
            userId: userId
        }
    });
    console.debug("store", store)
    if(store) {
        redirect(`${store.id}`);
    }

    return (
        <>
            {children}
        </>
    )

}