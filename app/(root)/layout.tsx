import React from "react";
import {auth} from "@clerk/nextjs";
import {redirect} from "next/navigation";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();


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
    const store: storeType = prisma.store.findFirst({
        where: {
            userId
        }
    });

    if(store) {
        redirect(`${store.id}`);
    }


}