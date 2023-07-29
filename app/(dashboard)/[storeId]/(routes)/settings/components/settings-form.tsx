"use client";

import {Store} from "@prisma/client";
import Heading from "@/components/ui/heading";
import {Button} from "@/components/ui/button";
import {Trash} from "lucide-react";
import {Separator} from "@/components/ui/separator";
import * as z from "zod";
import {Form, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {useState} from "react";

interface SettingsFormProps {
    initialData: Store;
}

const formSchema = z.object({
    name: z.string().min(1)
});

type SettingsFormValues = z.infer<typeof formSchema>;
export default function SettingsForm({initialData} : SettingsFormProps) {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const form = useForm<SettingsFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData
    });

    const onSubmit = async (data: SettingsFormValues) => {
        console.debug('[Settings Form Values]',data)
    }

    return (
        <>
            <div className="flex items-center justify-between">
                <Heading
                    title={"Settings"}
                    description={"Manage store preferences"}
                />
                <Button variant={"destructive"} size={"sm"} onClick={() => {}}>
                    <Trash className="h-4 w-4" />
                </Button>
            </div>
            <Separator />
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
                    <div className="grid grid-cols-3 gap-8">

                    </div>
                </form>
            </Form>
        </>
    )
}