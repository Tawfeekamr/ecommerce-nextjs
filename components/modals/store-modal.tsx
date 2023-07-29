"use client";

import * as z from "zod";

import Modal from "@/components/ui/modal";
import {useStoreModal} from "@/hooks/use-store-modal";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {useState} from "react";
import axios from "axios";
import toast from "react-hot-toast";
import {redirect} from "next/navigation";

const formSchema = z.object({
    name: z.string().min(1),
});
function StoreModal() {
    const [loading, setLoading] = useState(false);
    const storeModal = useStoreModal();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: ""
        }
    });

    const onSubmit = async (values: z.infer<typeof formSchema>)=> {
        console.debug("values:", values);

        try {
            setLoading(true);
            const res = await axios.post('/api/stores', values);
            toast.success(`${values.name} created successfully`);
            window.location.assign(`${res.data.id}`);
        }
        catch (err) {
            console.debug('[ERROR STORE FORM]', err);
            toast.error("Something went wrong")
        }
        finally {
            setLoading(false);
        }
    }
    return (
        <Modal description={"Hello"}
               title={"Nice"}
               isOpen={storeModal.isOpen}
               onClose={storeModal.onClose}>
            <div className={"space-y-4 py-2 pb-4"}>
               <Form {...form}>
                   <form onSubmit={form.handleSubmit(onSubmit)}>
                        <FormField
                            control={form.control}
                            name="name"
                            render={({field}) =>  {
                                return(
                                    <FormItem>
                                        <FormLabel>Name:</FormLabel>
                                        <FormControl>
                                            <Input disabled={loading} placeholder={"Store name"} {...field}/>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )
                            }}
                        />
                       <div className="pt-6 space-x-2 flex item-center justify-end">
                            <Button variant={"outline"} onClick={storeModal.onClose}>Cancel</Button>
                            <Button type={"submit"}>Continue</Button>
                       </div>
                   </form>
               </Form>
            </div>
        </Modal>
    )
}

export default StoreModal;